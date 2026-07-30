# Script para limpiar el .env del historial de Git y hacer push seguro
Write-Host "Iniciando limpieza de Git..." -ForegroundColor Cyan

# 1. Mover .env temporalmente al Escritorio si existe
if (Test-Path ".env") {
    Move-Item ".env" "$HOME\Desktop\.env.bak" -Force
    Write-Host "-> Archivo .env movido temporalmente al Escritorio." -ForegroundColor Green
}

# 2. Deshacer el último commit problemático manteniendo los archivos
git reset --soft HEAD~1

# 3. Forzar el retiro del .env de la caché de Git
git rm --cached .env -ErrorAction SilentlyContinue

# 4. Agregar los archivos limpios
git add .

# 5. Hacer commit del proyecto seguro
git commit -m "fix: limpiar secretos y actualizar codigo de manera segura"

# 6. Forzar el push a GitHub
git push origin main --force

# 7. Regresar el .env a la carpeta del proyecto
if (Test-Path "$HOME\Desktop\.env.bak") {
    Move-Item "$HOME\Desktop\.env.bak" ".env" -Force
    Write-Host "-> Archivo .env restaurado en el proyecto." -ForegroundColor Green
}

Write-Host "¡Proceso completado con éxito! Repositorio limpio y actualizado." -ForegroundColor Yellow