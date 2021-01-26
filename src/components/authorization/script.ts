export function register(): void {
    const register = document.querySelector('.header__authorization__register');
    const registerWindow = document.querySelector('.main__register-window');
    const signInWindow = document.querySelector('.main__sign-in-window');
    const overlay = document.querySelector('.overlay');
    const registerBtn = document.querySelector('#register');
    const succesWindow = document.querySelector('.succes-window');

    const login = document.querySelector('.login');
    const password = document.querySelector('.password');

    let log: string;
    let pass: string;

    overlay?.addEventListener('click', () => {
        registerWindow?.classList.add('hidden-item');
        succesWindow?.classList.add('hidden-item');
        signInWindow?.classList.add('hidden-item');
        overlay?.classList.add('hidden-item');
    });

    register?.addEventListener('click', () => {
        password.value = '';
        login.value = '';

       if(signInWindow?.classList.contains('hidden-item')) {
        registerWindow?.classList.toggle('hidden-item');
        overlay?.classList.toggle('hidden-item');
       } else{
        signInWindow?.classList.add('hidden-item');
        registerWindow?.classList.toggle('hidden-item');
        overlay?.classList.remove('hidden-item');
       }

       setInterval(()=>{
        if(login.value && password.value) {
            log = login.value;
            pass = password.value;
        }
       },100)
    });
    
    registerBtn?.addEventListener('click' ,() => {
        fetch("https://shielded-plateau-92130.herokuapp.com/posts", {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                login: log,
                password: pass
            })
        })
        //.then(res => res.json())
        //.then(data => console.log(data));
        log = '';
        pass = '';
        succesWindow?.classList.toggle('hidden-item');
    })
}

export function signIn(): void {
    const signInBtn = document.querySelector('.header__authorization__sign-in');
    const signInWindow = document.querySelector('.main__sign-in-window');
    const registerWindow = document.querySelector('.main__register-window');
    const overlay = document.querySelector('.overlay');
    const succesWindow = document.querySelector('.succes-window');
    const signinBTN = document.querySelector('#sign-in');
    const login = document.querySelector('.login-sign-in');
    const password = document.querySelector('.password-sign-in');
    const invalidAuth = document.querySelector('.invalid-auth');


    let log:string ;
    let pass:string;

    overlay?.addEventListener('click', () => {
        registerWindow?.classList.add('hidden-item');
        signInWindow?.classList.add('hidden-item');
        overlay?.classList.add('hidden-item');
    });

    signInBtn?.addEventListener('click', ()=>{
        if(registerWindow?.classList.contains('hidden-item')) {
            signInWindow?.classList.toggle('hidden-item');
            overlay?.classList.toggle('hidden-item');
           } else{
            registerWindow?.classList.add('hidden-item');
            signInWindow?.classList.toggle('hidden-item');
            overlay?.classList.remove('hidden-item');
            succesWindow?.classList.add('hidden-item');
           }
    });

    setInterval(()=>{
        if(login.value && password.value) {
            log = login.value;
            pass = password.value;
        }
       },10)

    signinBTN?.addEventListener('click' ,() => {
        fetch("https://shielded-plateau-92130.herokuapp.com/posts")
        .then(response => response.json())
        .then(data => {for(let i = 0; i < data.length; i++) {
           if(log === data[i].login && pass === data[i].password){

            if(invalidAuth?.classList.contains('hidden-item')){
                signInBtn.textContent = log;
                log = '';
                pass = '';
                signInWindow?.classList.toggle('hidden-item');
                overlay?.classList.toggle('hidden-item');
            }else{
                signInBtn.textContent = log;
                log = '';
                pass = '';
                invalidAuth?.classList.toggle('hidden-item');
                signInWindow?.classList.toggle('hidden-item');
                overlay?.classList.toggle('hidden-item');
            }
         
           }else{
            invalidAuth?.classList.toggle('hidden-item');
           }
        }})
    })
}
