//login.js
//获取应用实例
var app = getApp();
Page({
    data: {
        remind: '加载中',
        angle: 0,
        userInfo: {},
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    goToIndex: function () {
        wx.switchTab({
            url: '/pages/food/index'
        });
    },
    onLoad: function () {
        wx.setNavigationBarTitle({
            title: app.globalData.shopName
        });
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            // console.log(res.userInfo)
                        }
                    })
                }
            }
        })

    },
    onShow: function () {

    },
    onReady: function () {
        var that = this;
        setTimeout(function () {
            that.setData({
                remind: ''
            });
        }, 1000);
        wx.onAccelerometerChange(function (res) {
            var angle = -(res.x * 30).toFixed(1);
            if (angle > 14) {
                angle = 14;
            }
            else if (angle < -14) {
                angle = -14;
            }
            if (that.data.angle !== angle) {
                that.setData({
                    angle: angle
                });
            }
        });
    },
    login: function (e) {
        if (!e.detail.userInfo) {
            app.alert({'content': '登陆失败，请再次点击！'});
            return;
        }

        var data = e.detail.userInfo;
        wx.login({
            success: function (res) {
                if (!res.code) {
                    app.alert({'content': '登陆失败，请再次点击！'});
                    return;
                }
                data['code'] = res.code;
                wx.request({
                    url: 'http://127.0.0.1:8999/api/member/login', // 仅为示例，并非真实的接口地址
                    data: data,
                    method: 'POST',
                    header: app.getRequestHeader(),
                    success: function (res) {

                    }
                })
            }
        });


    }
});