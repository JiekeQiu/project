$(() => {
    function xuanran() {
        let getList = () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'GET',
                    url: "http://localhost:3000/setting/billList",
                    success(data) {
                        resolve(data);
                        // console.log(data);
                    }
                })
            })
        };
        (async () => {
            let data = await getList();
            // console.log(data);
            let html = data.map((item) => {
                return `
                            <tr>
                                <td style="width:300px">${item._id}</td>
                                <td>${item.name}</td>
                                <td>${item.asupplierge}</td>
                                <td>${item.price}</td>
                                <td>${item.pay}</td>
                                <td>${item.time}</td>
                                <td>
                                    <a href="billView.html"><img src="images/read.png" alt="查看" title="查看"/></a>
                                    <a class="updateBill"><img src="images/xiugai.png" alt="修改" title="修改"/></a>
                                    <a href="#" class="removeBill"><img src="images/schu.png" alt="删除" title="删除"/></a>
                                </td>
                        </tr>`
            }).join("");
            $('#providerTable').html(html);
        })();
    };
    let getList = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: "http://localhost:3000/setting/billList",
                success(data) {
                    resolve(data);
                    // console.log(data);
                }
            })
        })
    };
    let autoLogin = ()=>{
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                headers:{
                    token:localStorage.getItem('token')
                },
                url: "http://localhost:3000/setting/autoLogin",
                success(data) {
                    resolve(data);
                    console.log(data);
                    if(data==true){
                        xuanran();
                    }else{
                        location.href='login.html';
                    }
                }
            })
        });
    };
    autoLogin();
    (async () => {
        // console.log(isLogin);
        let data = await getList();
        console.log(data);
        let html = data.map((item) => {
            return `
                <tr>
                    <td style="width:300px">${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.asupplierge}</td>
                    <td>${item.price}</td>
                    <td>${item.pay}</td>
                    <td>${item.time}</td>
                    <td>
                        <a href="billView.html"><img src="images/read.png" alt="查看" title="查看"/></a>
                        <a class="updateBill"><img src="images/xiugai.png" alt="修改" title="修改"/></a>
                        <a href="#" class="removeBill"><img src="images/schu.png" alt="删除" title="删除"/></a>
                    </td>
            </tr>`
        }).join("");
        $('#providerTable').html(html);
        // 点击获取修改id
        $("#providerTable ").on('click', '.updateBill', function () {
            // console.log($(this).parent().parent().find('td').eq(0).html());
            location.href = "http://localhost:3000/billUpdate.html?id=" + $(this).parent().parent().find('td').eq(0).html();
        });
        remove();
    })();
    $('#cha').on('click', () => {
        $('#providerTable').html("");
        let vall = $('#neirong').val();
        let getname = (name) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'GET',
                    url: "http://localhost:3000/setting/billList",
                    data: {
                        name
                    },
                    success(data) {
                        resolve(data);
                        // console.log(data);
                    }
                })
            })
        }
        // })
        (async () => {
            let data = await getname(vall);
            // console.log(data);
            let html = data.map((item) => {
                return `
                <tr>
                    <td style="width:300px">${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.asupplierge}</td>
                    <td>${item.price}</td>
                    <td>${item.pay}</td>
                    <td>${item.time}</td>
                    <td>
                        <a href="billView.html"><img src="images/read.png" alt="查看" title="查看"/></a>
                        <a class="updateBill"><img src="images/xiugai.png" alt="修改" title="修改"/></a>
                        <a href="#" class="removeBill"><img src="images/schu.png" alt="删除" title="删除"/></a>
                    </td>
            </tr>`
            }).join("");
            // 点击修改获取id
            $("#providerTable").on('click', '.updateBill', function () {
                // console.log($(this).parent().parent().find('td').eq(0).html());
                location.href = "http://localhost:3000/billUpdate.html?id=" + $(this).parent().parent().find('td').eq(0).html();
            });
            for (var i = 0; i < data.length; i++) {
                // console.log(vall);
                if (data[i].name == vall) {
                    $('#providerTable').html(html);
                } else {
                    $('#providerTable').html("没有该商品信息");
                }
            };
            // xuanran();
        })();
    })
    function remove() {
        $("#providerTable").on('click', '.removeBill', function () {
            let _id = $(this).parent().parent().find('td').eq(0).html();
            let removeList = () => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: 'GET',
                        url: "http://localhost:3000/setting/updata",
                        data: {
                            _id
                        },
                        success(data) {
                            resolve(data);
                            console.log(data);
                        }
                    })
                })
            }
            removeList();
            xuanran();
        });
    }

})