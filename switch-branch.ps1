# switch-branch.ps1 - switch the local workspace between the two repos
#
#   .\switch-branch.ps1 frontend   -> switches to branch 'main'  (PacificBarista-Frontend repo)
#   .\switch-branch.ps1 backend    -> switches to branch 'master' (PacificBarista-Backend repo)
#
# This folder holds both projects in one working tree, but each git branch only
# tracks one of them. This script safely moves both project folders aside during
# the switch and restores them afterwards (including local artifacts like
# node_modules, .env, dist, .vercel, uploads) so nothing is lost or reinstalled.
#
# It aborts if you have uncommitted changes to tracked files - commit or stash
# them first.

param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("frontend", "backend")]
  [string]$To
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$current = git -C $root rev-parse --abbrev-ref HEAD

if ($To -eq "frontend") { $branch = "main";   $dir = "frontend" }
else                    { $branch = "master"; $dir = "backend"  }

if ($current -eq $branch) {
  Write-Host "Already on $branch. Nothing to do."
  exit 0
}

# Abort if tracked files were modified but not committed.
$lines = git -C $root status --porcelain -- frontend backend
$realChanges = $lines | Where-Object { $_ -notmatch '^\?\?' }
if ($realChanges) {
  Write-Host "You have uncommitted changes - commit or stash them first:"
  Write-Host $realChanges
  exit 1
}

$tmp = Join-Path $env:TEMP ("pb-switch-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tmp | Out-Null

foreach ($f in @("frontend", "backend")) {
  $src = Join-Path $root $f
  if (Test-Path -LiteralPath $src) {
    Move-Item -LiteralPath $src -Destination (Join-Path $tmp $f) -Force
  }
}

git -C $root checkout $branch
if ($LASTEXITCODE -ne 0) {
  foreach ($f in @("frontend", "backend")) {
    $s = Join-Path $tmp $f
    $d = Join-Path $root $f
    if (Test-Path -LiteralPath $s) { Move-Item -LiteralPath $s -Destination $d -Force }
  }
  Remove-Item -Recurse -Force -LiteralPath $tmp
  Write-Host "Switch failed - original state restored."
  exit 1
}

# The folder that is NOT tracked on the new branch comes back in full.
$sibling = if ($dir -eq "frontend") { "backend" } else { "frontend" }
$sibSrc = Join-Path $tmp $sibling
if (Test-Path -LiteralPath $sibSrc) {
  Move-Item -LiteralPath $sibSrc -Destination (Join-Path $root $sibling) -Force
}

# The target folder's source comes from the branch; restore only local artifacts.
$tgtSrc = Join-Path $tmp $dir
if (Test-Path -LiteralPath $tgtSrc) {
  $tgtDst = Join-Path $root $dir
  $artifactNames = @("node_modules", "dist", ".vercel", "uploads")
  Get-ChildItem -LiteralPath $tgtSrc -Force | ForEach-Object {
    if ($_.Name -like ".env*" -or ($artifactNames -contains $_.Name)) {
      Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $tgtDst $_.Name) -Recurse -Force
    }
  }
}

Remove-Item -Recurse -Force -LiteralPath $tmp

if ($To -eq "frontend") { $hint = "git push frontend main" }
else                    { $hint = "git push origin master" }
Write-Host "Now on $branch ($To repo)."
Write-Host "Push with: $hint"
