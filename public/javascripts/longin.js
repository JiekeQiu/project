$(() => {
    let btn = $("#btn");
    let login = (user, mima) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/login",
                data: {
                    user,
                    mima
                },
                success(data) {
                    resolve(data)
                    console.log(data);
                }
            })
        })
    }
    btn.click(async () => {
        let user = $("#user").val();
        let mima = $("#mima").val();
        let data = await login(user, mima);
        if (data.status === 'success') {
            console.log('登录成功');
            localStorage.setItem('token',data.token);
            location.href='index.html';
        } else {
            console.log('登录失败');
        }
    })
})