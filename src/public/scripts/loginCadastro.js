const LOGIN_URL = "login.html";
const apiUrl = 'http://localhost:3000/usuarios'; 

var db_usuarios = []; 

var usuarioCorrente = {};

function generateUUID() {
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function initLoginApp () {
    
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            db_usuarios = data;
        })
        .catch(error => {
            console.error('Erro ao ler usuários via API JSONServer:', error);
            alert("Erro ao carregar usuários. Verifique a conexão ou a URL da API.");
        });
};

function loginUser (email, senha) {

    for (var i = 0; i < db_usuarios.length; i++) {
        var usuario = db_usuarios[i];

        if (email == usuario.email && senha == usuario.senha) {
            usuarioCorrente.id = usuario.id;
            usuarioCorrente.login = usuario.login;
            usuarioCorrente.email = usuario.email;
            usuarioCorrente.nome = usuario.nome;
            usuarioCorrente.admin = usuario.admin; 

            sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));

            return true;
        }
    }

    return false;
}

function logoutUser () {
    usuarioCorrente = {};
    sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
    window.location = LOGIN_URL;
}


function addUser (nome, email, telefone, senha, isAdmin) {

    let newId = generateUUID ();
   
    let usuario = { "id": newId, "nome": nome, "email": email, "telefone": telefone, "senha": senha, "admin": isAdmin }; 

    if (db_usuarios.some(user => user.email === email)) {
        alert('Já existe um usuário cadastrado com este e-mail.');
        return false;
    }

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            db_usuarios.push (usuario);
            alert("Usuário inserido com sucesso. Agora você pode fazer login.");
            window.location.href = LOGIN_URL;
        })
        .catch(error => {
            console.error('Erro ao inserir usuário via API JSONServer:', error);
            alert("Erro ao inserir usuário. Tente novamente.");
        });
    return true;
}

initLoginApp ();