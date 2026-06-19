$w = New-Object -ComObject Word.Application
$w.Visible = $false
$d = $w.Documents.Open('c:\Users\lakshmi\OneDrive\Desktop\internship4\AI_Faculty_Coach_UI_Blueprint.docx')
$text = $d.Content.Text
$d.Close()
$w.Quit()
$text | Out-File -FilePath 'c:\Users\lakshmi\OneDrive\Desktop\internship4\blueprint_text.txt' -Encoding UTF8
Write-Host "Done - saved to blueprint_text.txt"
