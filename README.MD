<p align="center">
    <img src="./assets/images/powershell-kovak.png" width="130">
    <h2 align="center">Powershell Kovak</h2>
    <p align="center">Powershell kovak is a powershell obfuscation tool, ((100 - 1) + 1)% bypassing antivirus.</p>
    <a href="https://madhanmaaz.github.io/powershell-kovak/">
        <img src="https://img.shields.io/badge/LIVE-SITE-blue">
    </a>
    <a href="https://github.com/madhanmaaz/powershell-kovak/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/madhanmaaz/powershell-kovak">
    </a>
    <a href="https://github.com/madhanmaaz/powershell-kovak/stargazers">
        <img src="https://img.shields.io/github/stars/madhanmaaz/powershell-kovak">
    </a>
    <a href="https://github.com/madhanmaaz/powershell-kovak/issues">
        <img src="https://img.shields.io/github/issues/madhanmaaz/powershell-kovak">
    </a>
    <a href="https://www.paypal.com/paypalme/madhanmaazbw?country.x=IN&locale.x=en_GB">
    <img src="https://img.shields.io/badge/Support-PayPal-blue.svg" alt="Donate">
    </a>
</p>

🕸️ **Live:** [https://madhanmaaz.github.io/powershell-kovak/](https://madhanmaaz.github.io/powershell-kovak/)

#### DEMO
https://github.com/user-attachments/assets/91909438-b44f-4cd5-b6ad-3c89955b6b8b

#### 🧠 Powershell syntax suggestions

> [!IMPORTANT]
> - Control structures (while, if, for, try, catch, function) should open inline on the same line — even if nested.
> - Put all statements on separate lines, except for control structures.
> - Break down your code into smaller functions is recommended. (must)

- Recommended (line by line)
```powershell
$LHOST = "192.168.43.228";
$LPORT = 9001;
while ($true) { if($true) { some content } else { some content } }
if(1) { some content } else { some content }
for($i = 0; $i -lt 10; $i++) { some content }
try { some content } catch { some content }
function some-function($param) { some content }
$some-variable = some-content
$some-variable2 = some-content
```

#### 🚫 Not Recommended
- ❌ Do not write everything in one long line
```powershell
$LHOST = "192.168.43.228";$LPORT = 9001;while ($true) { if($true) { some content } else { some content } };if(1) { some content } else { some content };for($i = 0; $i -lt 10; $i++) { some content };try { some content } catch { some content };function some-function($param) { some content };$some-variable = some-content;$some-variable2 = some-content
```

## ⚠️ LEGAL
This tool is for educational and authorized testing only. You're responsible for what you do with it. Don’t be dumb, stay ethical.

