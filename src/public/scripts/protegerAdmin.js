document.addEventListener('DOMContentLoaded', function() {
    const usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    if (!usuarioCorrente || !usuarioCorrente.admin) {
        alert('Acesso restrito! Apenas administradores podem acessar esta página.');
        window.location.href = 'index.html';
    }
});