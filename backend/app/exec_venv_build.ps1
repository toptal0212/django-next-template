git # get directory of my file
$CurrentDir = Split-Path $MyInvocation.MyCommand.Path

# ディレクトリに移動
cd $CurrentDir

Write-Host "venv create"
py -m venv .venv

Write-Host "virtual env activate"
.\.venv\Scripts\Activate.ps1

Write-Host "library install in venv"
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
