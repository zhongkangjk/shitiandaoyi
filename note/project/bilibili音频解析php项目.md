### 我的服务器是海外的
应该不让访问B站，就先不部署了，先存一下代码

### 代码
```php
<?php
error_reporting(0);
header('Content-Type: text/html; charset=utf-8');

define('VIEW_API', 'https://api.bilibili.com/x/web-interface/view?');
define('PLAY_API', 'https://api.bilibili.com/x/player/playurl?fnval=16&fnver=0&fourk=1');
define('REFERER', 'https://www.bilibili.com/');
define('UA', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36');

if (isset($_GET['proxy']) && isset($_GET['url']) && isset($_GET['filename'])) {
    $audioUrl = base64_decode($_GET['url']);
    $filename = base64_decode($_GET['filename']);
    
    $fallbackName = preg_replace('/[^\x20-\x7E]/', '', $filename);
    if (empty(trim($fallbackName))) {
        $fallbackName = 'bilibili_audio';
    }
    
    $headers =[
        'Referer: ' . REFERER,
        'Origin: https://www.bilibili.com',
        'User-Agent: ' . UA
    ];
    
    if (isset($_SERVER['HTTP_RANGE'])) {
        $headers[] = 'Range: ' . $_SERVER['HTTP_RANGE'];
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $audioUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 0);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    header('Content-Type: audio/mp4');
    header('Accept-Ranges: bytes');
    header('Cache-Control: public, max-age=31536000');
    header('Content-Disposition: attachment; filename="' . $fallbackName . '.m4a"; filename*=UTF-8\'\'' . rawurlencode($filename) . '.m4a');
    
    curl_setopt($ch, CURLOPT_HEADERFUNCTION, function($ch, $headerLine) {
        if (preg_match('/^HTTP\/(1\.0|1\.1|2|3) (\d+) /i', $headerLine, $matches)) {
            http_response_code(intval($matches[2]));
        } else {
            $headerParts = explode(':', $headerLine, 2);
            if (count($headerParts) == 2) {
                $headerName = strtolower(trim($headerParts[0]));
                if (in_array($headerName, ['content-length', 'content-range'])) {
                    header(trim($headerLine));
                }
            }
        }
        return strlen($headerLine);
    });
    
    curl_setopt($ch, CURLOPT_WRITEFUNCTION, function($ch, $data) {
        echo $data;
        if (ob_get_level() > 0) ob_flush();
        flush();
        return strlen($data);
    });
    
    curl_exec($ch);
    curl_close($ch);
    exit;
}

function fetch($url, $headers =[]) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}

function getRedirectUrl($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_NOBODY, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if (in_array($httpCode,[301, 302, 307, 308])) {
        if (preg_match('/Location:\s*(.+?)\r?\n/i', $response, $matches)) {
            $redirectUrl = trim($matches[1]);
            if (strpos($redirectUrl, 'http') !== 0) {
                $parsed = parse_url($url);
                $redirectUrl = $parsed['scheme'] . '://' . $parsed['host'] . (strpos($redirectUrl, '/') === 0 ? '' : '/') . $redirectUrl;
            }
            return $redirectUrl;
        }
    }
    
    if ($httpCode == 200) {
        return $url;
    }
    
    return null;
}

function buildApiHeaders() {
    return[
        'Referer: ' . REFERER,
        'Origin: https://www.bilibili.com',
        'User-Agent: ' . UA
    ];
}

function extractVideoIds($input) {
    $results =[];
    
    $bvPattern = '/(?i)(BV[0-9A-Za-z]{10})/';
    $avPattern = '/(?i)(?<![0-9A-Za-z])av(\d+)(?![0-9A-Za-z])/';
    $b23Pattern = '/https?:\/\/b23\.tv\/[0-9A-Za-z]+/i';
    $biliUrlPattern = '/https?:\/\/(?:www\.)?bilibili\.com\/video\/[^\s]+/i';
    
    preg_match_all($bvPattern, $input, $bvMatches);
    foreach ($bvMatches[1] as $match) {
        $results[] = 'BV' . substr($match, 2);
    }
    
    preg_match_all($avPattern, $input, $avMatches);
    foreach ($avMatches[1] as $match) {
        $results[] = 'av' . $match;
    }
    
    preg_match_all($b23Pattern, $input, $b23Matches);
    foreach ($b23Matches[0] as $url) {
        $redirectUrl = getRedirectUrl($url);
        if ($redirectUrl) {
            $nested = extractVideoIds($redirectUrl);
            $results = array_merge($results, $nested);
        }
    }
    
    preg_match_all($biliUrlPattern, $input, $biliMatches);
    foreach ($biliMatches[0] as $url) {
        preg_match_all($bvPattern, $url, $urlBvMatches);
        foreach ($urlBvMatches[1] as $match) {
            $results[] = 'BV' . substr($match, 2);
        }
        preg_match_all($avPattern, $url, $urlAvMatches);
        foreach ($urlAvMatches[1] as $match) {
            $results[] = 'av' . $match;
        }
    }
    
    return array_unique($results);
}

function requestView($videoId) {
    $query = strpos($videoId, 'BV') === 0 
        ? 'bvid=' . urlencode($videoId)
        : 'aid=' . urlencode(substr($videoId, 2));
    $response = fetch(VIEW_API . $query, buildApiHeaders());
    $data = json_decode($response, true);
    if ($data['code'] !== 0) {
        throw new Exception($data['message'] ?? '接口返回异常');
    }
    return $data['data'];
}

function requestPlayUrl($bvid, $cid) {
    $api = PLAY_API . '&bvid=' . urlencode($bvid) . '&cid=' . urlencode($cid);
    $response = fetch($api, buildApiHeaders());
    $data = json_decode($response, true);
    if ($data['code'] !== 0) {
        throw new Exception($data['message'] ?? '接口返回异常');
    }
    return $data['data'];
}

function pickBestAudioUrl($playData) {
    if (!$playData || !isset($playData['dash']['audio'])) return null;
    $audios = $playData['dash']['audio'];
    if (empty($audios)) return null;
    
    $bestAudio = null;
    $maxBandwidth = -1;
    foreach ($audios as $audio) {
        $bandwidth = $audio['bandwidth'] ?? 0;
        if ($bestAudio === null || $bandwidth > $maxBandwidth) {
            $bestAudio = $audio;
            $maxBandwidth = $bandwidth;
        }
    }
    
    if (!$bestAudio) return null;
    
    $url = $bestAudio['base_url'] ?? $bestAudio['baseUrl'] ?? '';
    if (!empty($url)) return $url;
    
    $backupUrls = $bestAudio['backup_url'] ?? $bestAudio['backupUrl'] ??[];
    if (!empty($backupUrls)) return $backupUrls[0];
    
    return null;
}

function formatDuration($seconds) {
    $m = floor($seconds / 60);
    $s = $seconds % 60;
    return sprintf('%d:%02d', $m, $s);
}

function formatNumber($num) {
    if ($num >= 10000) {
        return round($num / 10000, 1) . '万';
    }
    return $num;
}

function sanitizeFilename($str) {
    $str = preg_replace('/[^\x{4e00}-\x{9fa5}a-zA-Z0-9\s\-_\(\)\[\]【】]/u', '_', $str);
    if ($str === null) {
        return 'bilibili_audio_' . time();
    }
    $str = preg_replace('/_+/', '_', $str);
    $str = trim($str, '_');
    return $str ?: 'bilibili_audio_' . time();
}

function truncate($str, $length = 120, $suffix = '...') {
    if (mb_strlen($str, 'UTF-8') <= $length) return $str;
    return mb_substr($str, 0, $length, 'UTF-8') . $suffix;
}

$videos = [];
$globalAudioList =[];
$error = '';
$input = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['input'])) {
    $input = $_POST['input'];
    $videoIds = extractVideoIds($input);
    
    if (empty($videoIds)) {
        $error = '未识别到有效的内容';
    } else {
        foreach ($videoIds as $vid) {
            try {
                $viewData = requestView($vid);
                $bvid = $viewData['bvid'];
                $title = $viewData['title'];
                $author = $viewData['owner']['name'] ?? '未知UP';
                $cover = $viewData['pic'];
                $duration = $viewData['duration'];
                $stat = $viewData['stat'] ??[];
                $desc = $viewData['desc'] ?? '';
                $pubdate = $viewData['pubdate'] ?? 0;
                $pages = $viewData['pages'] ?? [];
                
                $videoInfo =[
                    'bvid' => $bvid,
                    'title' => $title,
                    'author' => $author,
                    'cover' => $cover,
                    'duration' => formatDuration($duration),
                    'view' => formatNumber($stat['view'] ?? 0),
                    'like' => formatNumber($stat['like'] ?? 0),
                    'coin' => formatNumber($stat['coin'] ?? 0),
                    'favorite' => formatNumber($stat['favorite'] ?? 0),
                    'share' => formatNumber($stat['share'] ?? 0),
                    'danmaku' => formatNumber($stat['danmaku'] ?? 0),
                    'desc' => $desc,
                    'pubdate' => $pubdate,
                    'parts' =>[]
                ];
                
                if (count($pages) > 1) {
                    foreach ($pages as $index => $page) {
                        $cid = $page['cid'];
                        $partName = $page['part'] ?: ('P' . ($index + 1));
                        $pageNum = $page['page'] ?? ($index + 1);
                        $displayName = 'P' . $pageNum . ($page['part'] ? ' - ' . $page['part'] : '');
                        
                        $filename = sanitizeFilename($displayName . ' - ' . $title);
                        
                        try {
                            $playData = requestPlayUrl($bvid, $cid);
                            $audioUrl = pickBestAudioUrl($playData);
                            if ($audioUrl) {
                                $proxyUrl = '?proxy=1&url=' . urlencode(base64_encode($audioUrl)) . '&filename=' . urlencode(base64_encode($filename));
                                $part =[
                                    'name' => $displayName,
                                    'cid' => $cid,
                                    'audioUrl' => $audioUrl,
                                    'proxyUrl' => $proxyUrl,
                                    'duration' => formatDuration($page['duration']),
                                    'filename' => $filename
                                ];
                                $videoInfo['parts'][] = $part;
                                
                                $globalAudioList[] =[
                                    'name' => $displayName . ' - ' . $title,
                                    'artist' => $author,
                                    'url' => $proxyUrl,
                                    'cover' => $cover,
                                    'duration' => $part['duration'],
                                    'bvid' => $bvid,
                                    'partName' => $displayName
                                ];
                            }
                        } catch (Exception $e) {
                            continue;
                        }
                    }
                } else {
                    $cid = $viewData['cid'];
                    $displayName = '完整音频';
                    
                    $filename = sanitizeFilename($title);
                    
                    try {
                        $playData = requestPlayUrl($bvid, $cid);
                        $audioUrl = pickBestAudioUrl($playData);
                        if ($audioUrl) {
                            $proxyUrl = '?proxy=1&url=' . urlencode(base64_encode($audioUrl)) . '&filename=' . urlencode(base64_encode($filename));
                            $part =[
                                'name' => $displayName,
                                'cid' => $cid,
                                'audioUrl' => $audioUrl,
                                'proxyUrl' => $proxyUrl,
                                'duration' => formatDuration($duration),
                                'filename' => $filename
                            ];
                            $videoInfo['parts'][] = $part;
                            
                            $globalAudioList[] =[
                                'name' => $title,
                                'artist' => $author,
                                'url' => $proxyUrl,
                                'cover' => $cover,
                                'duration' => $part['duration'],
                                'bvid' => $bvid,
                                'partName' => $displayName
                            ];
                        }
                    } catch (Exception $e) {
                        continue;
                    }
                }
                
                if (!empty($videoInfo['parts'])) {
                    $videos[] = $videoInfo;
                }
            } catch (Exception $e) {
                continue;
            }
        }
        
        if (empty($videos)) {
            $error = '未能获取到任何视频信息';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="referrer" content="no-referrer">
    <title>哔哩哔哩音频解析</title>
    <link rel="stylesheet" href="https://jsd2.pixcat.cn/npm/aplayer@1.10.1/dist/APlayer.min.css">
    <link rel="stylesheet" href="https://jsd2.pixcat.cn/npm/@fortawesome/fontawesome-free@6.0.0/css/all.min.css">
    <style>
        :root {
            --bili-pink: #fb7299;
            --bg-light: #f4f5f7;
            --card-white: #ffffff;
            --text-dark: #1e2a3e;
            --text-gray: #5a6874;
            --border-light: #eef2f6;
            --radius-card: 20px;
            --radius-element: 12px;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background: var(--bg-light);
            color: var(--text-dark);
            line-height: 1.5;
            padding: 4rem 1rem 3rem;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .container {
            max-width: 1100px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        
        .hero {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .hero h1 {
            font-size: 2rem;
            font-weight: 600;
            color: var(--bili-pink);
            margin-bottom: 0.5rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .hero p {
            color: var(--text-gray);
            font-size: 0.95rem;
        }
        
        .search-card {
            background: var(--card-white);
            border-radius: var(--radius-card);
            box-shadow: 0 8px 20px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.03);
            padding: 1.5rem;
            margin-bottom: 2rem;
        }
        
        textarea {
            width: 100%;
            padding: 1rem;
            border: 1px solid var(--border-light);
            border-radius: var(--radius-element);
            font-size: 0.95rem;
            font-family: inherit;
            resize: vertical;
            transition: 0.2s;
            background: #fff;
        }
        
        textarea:focus {
            outline: none;
            border-color: var(--bili-pink);
            box-shadow: 0 0 0 3px rgba(251,114,153,0.1);
        }
        
        button {
            background: var(--bili-pink);
            color: white;
            border: none;
            padding: 0.8rem 1.8rem;
            border-radius: 40px;
            font-size: 0.95rem;
            font-weight: 500;
            cursor: pointer;
            transition: 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        button:hover {
            background: #e85b8a;
            transform: translateY(-1px);
        }
        
        .hint {
            font-size: 0.8rem;
            color: var(--text-gray);
            margin-top: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            flex-wrap: wrap;
        }
        
        .error {
            background: #fee9e6;
            color: #d44c2f;
            padding: 1rem;
            border-radius: var(--radius-element);
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
        }
        
        .global-player-card {
            background: var(--card-white);
            border-radius: var(--radius-card);
            box-shadow: 0 8px 24px rgba(0,0,0,0.05);
            margin-top: 2rem;
            overflow: hidden;
            order: 2;
        }
        
        .aplayer {
            border-radius: 0;
            box-shadow: none;
            background: #fafbfd;
        }
        
        .videos-container {
            order: 1;
        }
        
        .video-card {
            background: var(--card-white);
            border-radius: var(--radius-card);
            box-shadow: 0 4px 12px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.03);
            margin-bottom: 2rem;
            overflow: hidden;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .video-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }
        
        .video-header {
            display: flex;
            gap: 1.2rem;
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-light);
            flex-wrap: wrap;
        }
        
        .cover {
            width: 160px;
            height: 90px;
            object-fit: cover;
            border-radius: var(--radius-element);
            flex-shrink: 0;
            background: #eef;
        }
        
        .video-info {
            flex: 1;
            min-width: 200px;
        }
        
        .video-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.4rem;
            line-height: 1.3;
        }
        
        .video-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
            font-size: 0.8rem;
            color: var(--text-gray);
            margin-bottom: 0.5rem;
        }
        
        .video-meta span {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
        }
        
        .video-stats {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin: 0.8rem 0 0.4rem;
            font-size: 0.8rem;
            color: var(--text-gray);
        }
        
        .video-stats i {
            width: 1rem;
        }
        
        .desc {
            font-size: 0.85rem;
            color: var(--text-gray);
            background: #f8fafc;
            padding: 0.8rem;
            border-radius: var(--radius-element);
            margin-top: 0.8rem;
            line-height: 1.4;
            word-break: break-word;
        }
        
        .parts {
            padding: 0 1.5rem 1rem;
        }
        
        .part {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.9rem 0;
            border-bottom: 1px solid var(--border-light);
            flex-wrap: wrap;
            gap: 0.8rem;
        }
        
        .part:last-child {
            border-bottom: none;
        }
        
        .part-name {
            font-size: 0.95rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        
        .part-time {
            font-size: 0.75rem;
            color: var(--text-gray);
            background: #f0f2f5;
            padding: 0.2rem 0.5rem;
            border-radius: 20px;
        }
        
        .part-actions {
            display: flex;
            gap: 0.6rem;
        }
        
        .btn-icon {
            background: transparent;
            padding: 0.4rem 0.8rem;
            border-radius: 40px;
            font-size: 0.8rem;
            font-family: inherit;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            transition: 0.2s;
            cursor: pointer;
            border: none;
            text-decoration: none;
        }
        
        .btn-play {
            background: var(--bili-pink);
            color: white;
        }
        
        .btn-play:hover {
            background: #e85b8a;
        }
        
        .btn-dl {
            background: #f0f2f5;
            color: var(--text-dark);
        }
        
        .btn-dl:hover {
            background: #e4e8ef;
        }
        
        .empty-state {
            text-align: center;
            padding: 3rem 1rem;
            color: var(--text-gray);
            background: var(--card-white);
            border-radius: var(--radius-card);
            box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }
        
        @media (max-width: 680px) {
            body {
                padding: 3rem 1rem 2rem;
            }
            .video-header {
                flex-direction: column;
            }
            .cover {
                width: 100%;
                height: auto;
                aspect-ratio: 16/9;
            }
            .part {
                flex-direction: column;
                align-items: flex-start;
            }
            .part-actions {
                width: 100%;
            }
            .btn-icon {
                flex: 1;
                justify-content: center;
            }
            .video-stats {
                gap: 0.8rem;
            }
        }
        
        @media (max-width: 480px) {
            .hero h1 {
                font-size: 1.6rem;
            }
            .video-title {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
<div class="container">
    <div class="hero">
        <h1><i class="fa-brands fa-bilibili fa-bounce"></i> 哔哩哔哩音频解析</h1>
        <p>获取指定视频的音频部分，并尝试以高音质下载</p>
    </div>
    
    <div class="search-card">
        <form method="POST" id="form">
            <div class="input-group">
                <textarea name="input" placeholder="填入粘贴 BV/AV 号、b23.tv 短链、B站完整分享链接或包含它们的文本..."><?php echo htmlspecialchars($input); ?></textarea>
            </div>
            <button type="submit" id="submitBtn"><i class="fas fa-search"></i> 解析</button>
            <div class="hint"><i class="fas fa-lightbulb"></i> 支持分P与多个视频条目</div>
        </form>
    </div>
    
    <?php if ($error): ?>
        <div class="error"><i class="fas fa-exclamation-circle"></i> <?php echo $error; ?></div>
    <?php endif; ?>
    
    <?php if (!empty($globalAudioList)): ?>
        <div class="videos-container">
            <?php foreach ($videos as $video): ?>
                <div class="video-card" data-bvid="<?php echo $video['bvid']; ?>">
                    <div class="video-header">
                        <img class="cover" src="<?php echo htmlspecialchars($video['cover']); ?>" alt="封面" loading="lazy">
                        <div class="video-info">
                            <div class="video-title"><?php echo htmlspecialchars($video['title']); ?></div>
                            <div class="video-meta">
                                <span><i class="fas fa-user-circle"></i> <?php echo htmlspecialchars($video['author']); ?></span>
                                <span><i class="far fa-calendar-alt"></i> <?php echo date('Y-m-d', $video['pubdate']); ?></span>
                                <span><i class="far fa-clock"></i> <?php echo $video['duration']; ?></span>
                            </div>
                            <div class="video-stats">
                                <span><i class="fas fa-play"></i> <?php echo $video['view']; ?></span>
                                <span><i class="fas fa-thumbs-up"></i> <?php echo $video['like']; ?></span>
                                <span><i class="fas fa-coins"></i> <?php echo $video['coin']; ?></span>
                                <span><i class="fas fa-star"></i> <?php echo $video['favorite']; ?></span>
                                <span><i class="fas fa-share-alt"></i> <?php echo $video['share']; ?></span>
                                <span><i class="fas fa-comment-dots"></i> <?php echo $video['danmaku']; ?></span>
                            </div>
                            <?php if (!empty($video['desc'])): ?>
                                <div class="desc"><i class="fas fa-align-left"></i> <?php echo nl2br(htmlspecialchars(truncate($video['desc'], 180))); ?></div>
                            <?php endif; ?>
                        </div>
                    </div>
                    
                    <div class="parts">
                        <?php foreach ($video['parts'] as $index => $part): ?>
                            <div class="part" data-part-index="<?php echo $index; ?>">
                                <div class="part-name">
                                    <i class="fas fa-music"></i> <?php echo htmlspecialchars($part['name']); ?>
                                    <span class="part-time"><?php echo $part['duration']; ?></span>
                                </div>
                                <div class="part-actions">
                                    <button class="btn-icon btn-play" data-audio-name="<?php echo htmlspecialchars(count($video['parts']) > 1 ? $part['name'] . ' - ' . $video['title'] : $video['title'], ENT_QUOTES); ?>" data-artist="<?php echo htmlspecialchars($video['author'], ENT_QUOTES); ?>" data-cover="<?php echo htmlspecialchars($video['cover']); ?>" data-url="<?php echo $part['proxyUrl']; ?>"><i class="fas fa-play"></i> 播放</button>
                                    <a href="<?php echo $part['proxyUrl']; ?>" class="btn-icon btn-dl" download="<?php echo htmlspecialchars($part['filename'], ENT_QUOTES); ?>.m4a"><i class="fas fa-download"></i> 下载</a>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        
        <div class="global-player-card">
            <div id="global-player"></div>
        </div>
    <?php elseif ($_SERVER['REQUEST_METHOD'] === 'POST'): ?>
        <div class="empty-state"><i class="fas fa-search"></i> 未找到有效音频，请检查输入内容</div>
    <?php else: ?>
        <div class="empty-state"><i class="fas fa-arrow-up"></i> 在输入框中粘贴 B 站链接开始解析</div>
    <?php endif; ?>

</div>

<script src="https://jsd2.pixcat.cn/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>
<script>
    var globalAudioData = <?php echo json_encode($globalAudioList); ?>;
    var globalPlayer = null;

    function initGlobalPlayer() {
        if (!globalAudioData.length) return;
        globalPlayer = new APlayer({
            container: document.getElementById('global-player'),
            audio: globalAudioData.map(item => ({
                name: item.name,
                artist: item.artist,
                url: item.url,
                cover: item.cover,
                theme: '#fb7299'
            })),
            autoplay: false,
            loop: 'all',
            order: 'list',
            listFolded: false,
            listMaxHeight: 280,
            theme: '#fb7299'
        });
    }

    function playAudioInGlobal(audioName, artist, cover, url) {
        if (!globalPlayer) return;
        let index = -1;
        for (let i = 0; i < globalAudioData.length; i++) {
            if (globalAudioData[i].url === url) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            globalPlayer.list.switch(index);
            globalPlayer.play();
            document.querySelector('.global-player-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            for (let i = 0; i < globalAudioData.length; i++) {
                if (globalAudioData[i].name === audioName && globalAudioData[i].artist === artist) {
                    globalPlayer.list.switch(i);
                    globalPlayer.play();
                    document.querySelector('.global-player-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
                    break;
                }
            }
        }
    }

    function bindPlayButtons() {
        document.querySelectorAll('.btn-play').forEach(btn => {
            btn.removeEventListener('click', playHandler);
            btn.addEventListener('click', playHandler);
        });
    }

    function playHandler(e) {
        e.preventDefault();
        const name = this.dataset.audioName;
        const artist = this.dataset.artist;
        const cover = this.dataset.cover;
        const url = this.dataset.url;
        if (name && artist && url) {
            playAudioInGlobal(name, artist, cover, url);
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        if (globalAudioData.length) {
            initGlobalPlayer();
            bindPlayButtons();
        }
    });

    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', function() {
            const btn = document.getElementById('submitBtn');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> 解析中...';
        });
    }
</script>
</body>
</html>
```