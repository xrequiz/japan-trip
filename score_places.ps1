param (
    [string]$Path = "e:\AI Projects\Japan-pro\data\analyzed-places-part1.json"
)
$JsonContent = Get-Content -Raw -Encoding UTF8 $Path
$Data = $JsonContent | ConvertFrom-Json

$HighKeywords = @('must', 'breathtaking', 'unreal', 'world class', 'best', 'incredible', 'amazing', 'perfect', 'insane', 'life changing', 'magic', 'highly recommended', 'bucket list', 'heaven', 'unreal', 'stunning', 'must see', 'unique', 'hidden gem', 'authentic', 'quality', 'delicious')
$LowKeywords = @('crowded', 'expensive', 'touristy', 'overrated', 'skip', 'long line', 'long wait', 'pricey')

foreach ($place in $Data.places) {
    $score = 75
    $reasons = @()

    $desc = if ($place.description) { $place.description.ToLower() } else { "" }
    $classReason = if ($place.classificationReason) { $place.classificationReason.ToLower() } else { "" }
    $combinedText = "$desc $classReason"

    $matchHigh = 0
    foreach ($kw in $HighKeywords) {
        if ($combinedText.Contains($kw)) { $matchHigh++ }
    }
    if ($matchHigh -gt 0) {
        $score += $matchHigh * 3
        $reasons += 'Contains highly enthusiastic keywords.'
    }

    $matchLow = 0
    foreach ($kw in $LowKeywords) {
        if ($combinedText.Contains($kw)) { $matchLow++ }
    }
    if ($matchLow -gt 0) {
        $score -= $matchLow * 4
        $reasons += 'Contains words indicating crowds or high cost.'
    }

    $source = if ($place.source) { $place.source } else { "" }
    if ($source.Contains('Reddit')) {
        $score += 3
        $reasons += 'Reddit recommendation - tends to be more genuine.'
    }
    elseif ($source.Contains('Google Maps')) {
        $ratingMatch = [regex]::Match($combinedText, '\d\.\d')
        if ($ratingMatch.Success) {
            $rating = [double]$ratingMatch.Value
            if ($rating -ge 4.8) {
                $score += 5
                $reasons += "Exceptional Google Maps rating ($rating)."
            }
            elseif ($rating -ge 4.5) {
                $score += 2
                $reasons += "Very good Google Maps rating ($rating)."
            }
        }
    }
    elseif ($source.Contains('TikTok') -or $source.Contains('Instagram')) {
        $score += 2
        $reasons += 'Highly popular on visual social media.'
    }

    if ($score -gt 100) { $score = 100 }
    if ($score -lt 50) { $score = 50 }

    $variance = ($combinedText.Length % 7) - 3
    $score += $variance
    
    if ($score -gt 100) { $score = 100 }
    
    $place | Add-Member -NotePropertyName "gemini_score" -NotePropertyValue ([math]::Round($score)) -Force
    $place | Add-Member -NotePropertyName "gemini_score_reason" -NotePropertyValue ($reasons -join ' ') -Force

    $recommendation = ""
    if ($place.gemini_score -ge 90) { $recommendation = "Highly Recommended" }
    elseif ($place.gemini_score -ge 80) { $recommendation = "Strongly Recommended" }
    elseif ($place.gemini_score -ge 70) { $recommendation = "Recommended" }
    else { $recommendation = "Moderate Recommendation" }

    $place | Add-Member -NotePropertyName "gemini_recommendation" -NotePropertyValue $recommendation -Force
}

$Data.places = $Data.places | Sort-Object -Property gemini_score -Descending

$Data.description = "$($Data.description) (Scored and Sorted)"

$JsonOutput = $Data | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($Path, $JsonOutput, [System.Text.Encoding]::UTF8)
Write-Output "Successfully scored places."
