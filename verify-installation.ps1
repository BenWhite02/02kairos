# =============================================================================
# KAIROS FRONTEND - INSTALLATION VERIFICATION
# =============================================================================

Write-Host "🔍 Verifying Kairos Enhanced Dashboard Installation..." -ForegroundColor Cyan

$errors = @()
$warnings = @()

# Check essential files
$requiredFiles = @(
    "src/App.tsx",
    "src/hooks/useApi.ts",
    "src/hooks/useLocalStorage.ts",
    "package.json"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ Found: $file" -ForegroundColor Green
    } else {
        $errors += "Missing: $file"
        Write-Host "❌ Missing: $file" -ForegroundColor Red
    }
}

# Check package.json dependencies
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    
    $requiredDeps = @(
        "@tanstack/react-query",
        "framer-motion",
        "react-router-dom",
        "zustand"
    )
    
    foreach ($dep in $requiredDeps) {
        if ($packageJson.dependencies.$dep) {
            Write-Host "✅ Dependency: $dep" -ForegroundColor Green
        } else {
            $warnings += "Missing dependency: $dep"
            Write-Host "⚠️  Missing dependency: $dep" -ForegroundColor Yellow
        }
    }
}

# Check directory structure
$requiredDirs = @(
    "src/hooks",
    "src/components/ui",
    "src/pages"
)

foreach ($dir in $requiredDirs) {
    if (Test-Path $dir) {
        Write-Host "✅ Directory: $dir" -ForegroundColor Green
    } else {
        $warnings += "Missing directory: $dir"
        Write-Host "⚠️  Missing directory: $dir" -ForegroundColor Yellow
    }
}

# Summary
Write-Host ""
if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "🎉 Installation verification passed!" -ForegroundColor Green
    Write-Host "Your Kairos Enhanced Dashboard is ready to use." -ForegroundColor Green
} else {
    if ($errors.Count -gt 0) {
        Write-Host "❌ Errors found:" -ForegroundColor Red
        foreach ($error in $errors) {
            Write-Host "   - $error" -ForegroundColor Red
        }
    }
    
    if ($warnings.Count -gt 0) {
        Write-Host "⚠️  Warnings:" -ForegroundColor Yellow
        foreach ($warning in $warnings) {
            Write-Host "   - $warning" -ForegroundColor Yellow
        }
    }
    
    Write-Host ""
    Write-Host "Please address the issues above before proceeding." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Next: Run 'npm run dev' to start the development server" -ForegroundColor Cyan
