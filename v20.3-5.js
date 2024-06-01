function openmenu(val) {
    if (document.getElementById('diagdiv').style.display) {
        if (val == undefined) {
            val = document.getElementById('menubot').style.display
        };
        if (val) {
            document.getElementById('menutop').style.display = '';
            document.getElementById('menubot').style.display = '';
            showmenu(1)
        } else {
            document.getElementById('menutop').style.display = 'none';
            document.getElementById('menubot').style.display = 'none';
            document.getElementById('menudiv').style.width = '';
            chgmenu(0);
            showmenu(0)
        };
        theatr.menuopen = val;
        theatr.menust = val;
        layoutchg()
    }
}

function showmenu(val) {
    var obj = document.getElementById('menudiv');
    if (val) {
        if (obj.chk) {
            clearTimeout(obj.chk);
            obj.chk = 0;
            obj.style.opacity = ''
        }
    } else {
        if (document.getElementById('hm').chk && !theatr.menuopen && theatr.hidechat) {
            if (val < 1) {
                if (!obj.chk) {
                    obj.chk = setTimeout(showmenu, 1000)
                }
            } else {
                obj.style.opacity = getCookie('menuopaq')
            }
        }
    }
}

function showdiag(txt, obj) {
    obj = obj || {};
    document.getElementById('diagtxt').innerHTML = txt || '';
    document.getElementById('diagok').innerHTML = obj.oktxt || 'OK';
    document.getElementById('diagok').onclick = obj.okfun ? obj.okfun : function () {
        showdiag();
        openmenu(theatr.menust)
    };
    document.getElementById('diagno').innerHTML = obj.notxt || '';
    document.getElementById('diagno').onclick = obj.nofun ? obj.nofun : null;
    document.getElementById('diagno').style.display = obj.nofun ? '' : 'none';
    document.getElementById('diagyes').innerHTML = obj.yestxt || '';
    document.getElementById('diagyes').onclick = obj.yesfun ? obj.yesfun : null;
    document.getElementById('diagyes').style.display = obj.yesfun ? '' : 'none';
    document.getElementById('diagapp').innerHTML = obj.apptxt || '';
    document.getElementById('diagapp').onclick = obj.appfun ? obj.appfun : null;
    document.getElementById('diagapp').style.display = obj.appfun ? '' : 'none';
    document.getElementById('menubtn').style.display = txt ? 'none' : '';
    document.getElementById('diagdiv').style.display = txt ? '' : 'none';
    if (txt) {
        theatr.menuopen = true;
        document.getElementById('menutop').style.display = 'none';
        document.getElementById('menubot').style.display = 'none';
        if (!document.getElementById('menudiv').style.width) {
            showmenu(1);
            layoutchg()
        }
    }
}

function chatleft() {
    var chk = document.getElementById('lc').chk;
    if (chk) {
        document.getElementById('playdiv').style.left = theatr.hidechat || theatr.portmode ? '0px' : '340px';
        document.getElementById('playdiv').style.right = '0px'
    } else {
        document.getElementById('playdiv').style.right = theatr.hidechat || theatr.portmode ? '0px' : '340px';
        document.getElementById('playdiv').style.left = '0px'
    };
    chgCookie(chk, 'leftchat');
    document.getElementById('chatdiv').style.width = theatr.chatonly || theatr.portmode ? '' : '340px';
    document.getElementById('chatdiv').style.left = theatr.chatonly || theatr.portmode ? '0px' : '';
    document.getElementById('chatdiv').style.right = !chk || theatr.chatonly || theatr.portmode ? '0px' : '';
    document.getElementById('chatvis').style.display = theatr.hidechat && !theatr.menuopen ? '' : 'none';
    document.getElementById('menudiv').style.right = (document.getElementById('lc').chk && document.getElementById('chatdiv').style.width !== '100%') ? '' : '0px';
    document.getElementById('menudiv').style.left = (document.getElementById('lc').chk && document.getElementById('chatdiv').style.width !== '100%' && !theatr.menuopen && !theatr.hidechat) ? '290px' : ''
}

function chatonly(chk) {
    if (chk > 1) {
        chk = !chans.length && chats.length && !theatr.hidechat
    } else {
        if (chk < 0) {
            chk = !theatr.chatonly
        }
    };
    theatr.chatonly = chk;
    chatleft()
}

function hidechat(chk) {
    if (chk < 0) {
        chk = !theatr.hidechat
    };
    document.getElementById('chatdiv').style.visibility = chk ? 'hidden' : '';
    theatr.hidechat = chk;
    chatleft();
    showmenu(!chk)
}

function chgmenu(val) {
    document.getElementById('mp' + theatr.menupg).style.display = 'none';
    document.getElementById('mp' + val).style.display = '';
    document.getElementById('fscrbtn').style.display = val ? 'none' : '';
    document.getElementById('backbtn').style.display = val ? '' : 'none';
    document.getElementById('menubot').scrollTop = val ? 0 : document.getElementById('menubot').scrollHeight;
    theatr.menupg = val
}

function chgtabs(val) {
    if (val !== theatr.opstab) {
        document.getElementById('tp' + theatr.opstab).style.display = 'none';
        document.getElementById('tp' + val).style.display = '';
        document.getElementById('tb' + theatr.opstab).style.color = '';
        document.getElementById('tb' + theatr.opstab).style.fontWeight = '';
        document.getElementById('tb' + val).style.color = '#00B8F5';
        document.getElementById('tb' + val).style.fontWeight = 'bold';
        theatr.opstab = val
    }
}

function notifyusr(txt) {
    var obj = document.getElementById('notdiv');
    if (txt < 0) {
        obj.style.display = 'none'
    } else {
        if (txt > 0) {
            obj.childNodes[1].style.display = obj.lastChild.style.display ? '' : 'none';
            obj.childNodes[2].style.display = obj.lastChild.style.display ? '' : 'none'
        } else {
            if (obj.childNodes.length > 2) {
                obj.removeChild(obj.lastChild)
            };
            var val = document.getElementById(txt).cloneNode(true);
            val.firstChild.removeChild(val.firstChild.firstChild);
            val.firstChild.style.textAlign = 'center';
            val.lastChild.style.background = '#0070BA';
            val.lastChild.style.padding = '10px';
            val.className = '';
            val.style.display = obj.childNodes[1].style.display;
            obj.appendChild(val);
            obj.style.display = ''
        }
    }
}

function popupfaq(obj, txt) {
    if (obj.parentNode.lastChild.className !== 'faqpop') {
        var val = document.getElementById(txt).lastChild.cloneNode(true);
        val.className = 'faqpop';
        val.style.background = document.getElementById('menudiv').style.background;
        val.onclick = function (event) {
            this.parentNode.removeChild(this)
        };
        obj.parentNode.appendChild(val)
    } else {
        obj.parentNode.removeChild(obj.parentNode.lastChild)
    }
}

function evtchk(event) {
    if (event.ctrlKey) {
        openmenu(0)
    }
}

function dropover(event, chk) {
    event.preventDefault();
    event.stopPropagation();
    if (!document.getElementById('eclipse')) {
        addfromui(chk, event.dataTransfer.getData('Text'));
        evtchk(event)
    }
}

function blckover(obj, chk) {
    document.getElementById('blk' + obj).style.background = chk ? document.getElementById('menudiv').style.background : '';
    document.getElementById('scr' + obj).style.display = chk ? '' : 'none'
}

function imgevt(event) {
    if (event.target.nodeName.toLowerCase() === 'img') {
        event.target.style.opacity = '0.7';
        setTimeout(function () {
            event.target.style.opacity = ''
        }, 500)
    }
}

function showctls(chk) {
    chk = chans.length + chats.length || chk && document.getElementById('strc').style.display;
    document.getElementById('menudsc').style.display = chk ? 'none' : '';
    document.getElementById('strt').innerHTML = chk ? 'Streams:' : 'Streams and videos:';
    document.getElementById('strc').style.display = chk ? '' : 'none';
    document.getElementById('vodc').style.display = chk ? '' : 'none';
    document.getElementById('chtc').style.display = chk ? '' : 'none'
}

function vodctls() {
    var obj = document.getElementById('vodtog');
    obj.style.display = obj.style.display ? '' : 'none'
}

function vodtimes() {
    showdiag('Would you like to sync all videos with the assigned timestamps, or would you like to assign the current ones?', {
        apptxt: 'Sync',
        appfun: function () {
            showdiag();
            openmenu(0);
            syncvods()
        },
        yestxt: 'Assign',
        yesfun: function () {
            showdiag();
            openmenu(1);
            seekvods(3);
            sharelnk()
        },
        notxt: 'Remove',
        nofun: function () {
            showdiag();
            openmenu(1);
            seekvods(4);
            sharelnk()
        },
        oktxt: 'Cancel'
    })
}

function seekvods(chk, val, txt) {
    if (!chk) {
        clearTimeout(theatr.seekt);
        theatr.seekn += 5
    };
    for (var i = 0; i < chans.length; i++) {
        var obj = document.getElementById('v-' + fldids[i]);
        if (obj.player && obj.player.getDuration() < Infinity) {
            if (!chk) {
                if (obj.twitch) {
                    obj.player.play()
                };
                obj.player.seek(obj.player.getCurrentTime() + (theatr.seekn * val));
                if (obj.yt && theatr.seekn > 10) {
                    obj.player.pause()
                };
                notifyusr('faq-vodc')
            } else {
                if (chk < 2) {
                    if (obj.twitch) {
                        notifyusr('faq-vodf');
                        txt = 1
                    } else {
                        if (!txt) {
                            notifyusr('faq-vodc')
                        };
                        obj.player.pause();
                        obj.player.seek(obj.player.getCurrentTime() + val)
                    }
                } else {
                    if (chk < 3) {
                        if (obj.yt) {
                            obj.player.setPlaybackRate(obj.player.getPlaybackRate() + val)
                        } else {
                            notifyusr('faq-vodf')
                        }
                    } else {
                        var list = chans[i].split('&');
                        if (obj.yt || srcharay(list, /^vod=/i) > -1) {
                            val = srcharay(list, /^t=/i);
                            obj.t = obj.player.getCurrentTime();
                            if (val > -1) {
                                list.splice(val, 1);
                                chans[i] = list.join('&')
                            };
                            if (chk < 4) {
                                chans[i] += '&t=' + formatime(obj.t)
                            };
                            if (obj.twitch) {
                                document.getElementById('t-' + fldids[i]).value = chans[i]
                            }
                        }
                    }
                }
            }
        }
    };
    if (!chk) {
        theatr.seekt = setTimeout(function () {
            theatr.seekn = 0
        }, 1000)
    }
}

function formatime(val) {
    return (val > 3600 ? Math.floor(val / 60 / 60) + 'h' : '') + Math.floor(val / 60 % 60) + 'm' + Math.floor(val % 60) + 's'
}

function chgextctl(event, val) {
    event.stopPropagation();
    if (srcharay(fldids, theatr.curctl) > -1) {
        if (!theatr.pinctl) {
            document.getElementById(theatr.curctl).firstChild.style.display = 'none'
        };
        document.getElementById('v-' + theatr.curctl).lastChild.style.display = 'none'
    };
    theatr.curctl = val;
    if (val > -1) {
        document.getElementById(val).firstChild.style.display = '';
        if (document.getElementById('hg').chk) {
            document.getElementById('v-' + val).lastChild.style.display = ''
        }
    }
}

function pinextctl() {
    theatr.pinctl = !theatr.pinctl;
    for (var i = 0; i < fldids.length; i++) {
        document.getElementById(fldids[i]).firstChild.style.display = theatr.pinctl ? '' : 'none'
    }
}

function isfullscr() {
    return document.fullscreenElement || document.fullScreenElement || document.webkitFullscreenElement || document.webkitFullScreenElement || document.mozFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.msFullScreenElement
}

function gofullscr() {
    if (!theatr.pwa) {
        if (document.documentElement.requestFullscreen) {
            if (isfullscr()) {
                document.exitFullscreen()
            } else {
                document.documentElement.requestFullscreen()
            }
        } else {
            showdiag('It seems this browser does not allow/support fullscreen mode.')
        }
    }
}

function onfullscr() {
    if (document.getElementById('fa').chk && isfullscr()) {
        chgaudio(isfullscr().parentNode.id.substring(2), -1)
    }
}

function getplayer(indx) {
    return document.getElementById('v-' + fldids[indx])
}

function chknumval(txt) {
    return (txt !== '' && txt > -1 && txt < 101)
}

function updnumval(obj, val) {
    if (val && chknumval(obj.value)) {
        val = Math.round(obj.value / 5) * 5 + val;
        obj.value = val > 100 ? 100 : (val < 0 ? 0 : val)
    }
}

function chgdefvol(txt, chk, i) {
    if (chknumval(txt) || !chk) {
        var obj = document.getElementById('defvol');
        txt = parseInt(txt, 10);
        if (!chknumval(txt)) {
            txt = obj.value
        } else {
            if (txt != obj.chk && !i) {
                obj.chk = txt;
                setchk('vo', true);
                chgCookie(true, 'playrvol', txt)
            }
        };
        obj.value = txt;
        document.getElementById('volval').value = txt
    }
}

function chgcurvol(txt, chk) {
    if (chknumval(txt) || !chk) {
        var obj = document.getElementById('curvol');
        txt = parseInt(txt, 10);
        if (!chknumval(txt)) {
            txt = obj.value
        } else {
            if (txt != obj.chk) {
                obj.chk = txt;
                chgvolume(txt)
            }
        };
        obj.value = txt;
        document.getElementById('voltxt').value = txt
    }
}

function chkselopt(obj) {
    document.getElementById(obj).checked = true;
    document.getElementById(obj).onclick()
}

function chgselopt(val, chk) {
    var obj = document.getElementById(val);
    chgCookie(chk, val, obj.options[obj.selectedIndex].value)
}

function chgCookie(chk, val, txt) {
    var i = new Date();
    i.setTime(i.getTime() + ((chk ? 365 : 0) * 24 * 60 * 60 * 1000));
    document.cookie = val + '=' + (chk ? (txt == undefined ? 1 : txt) : '') + ';expires=' + i.toUTCString() + ';path=/'
}

function getCookie(txt) {
    if (txt) {
        return getvarval(document.cookie.replace(/\s+/g, '').split(';'), txt)
    } else {
        return document.cookie.replace(/\s+/g, '').split(';')
    }
}

function getvarval(list, txt, chk) {
    for (var i = 0; i < list.length; i++) {
        var indx = list[i].indexOf('=');
        if (indx > -1) {
            if (list[i].substring(0, indx).toLowerCase() === txt.toLowerCase()) {
                return list[i].substring(indx + 1)
            }
        }
    };
    return chk || ''
}

function darkenmydayz(txt, val) {
    if (!val) {
        val = 30
    };
    txt = txt.match(/.{2}/g);
    for (var i = 0; i < 3; i++) {
        txt[i] = parseInt(txt[i], 16) + val;
        txt[i] = (txt[i] < 0 ? 0 : (txt[i] > 255 ? 255 : txt[i])).toString(16);
        if (txt[i].length < 2) {
            txt[i] = '0' + txt[i]
        }
    };
    return txt.join('').toUpperCase()
}

function chgtheme() {
    var obj = document.getElementById('themesel');
    var val = obj.options[obj.selectedIndex].value;
    if (val === 'c') {
        document.getElementById('colordiv').style.display = '';
        val = document.getElementById('colortxt').value
    } else {
        document.getElementById('colordiv').style.display = 'none'
    };
    if (!val) {
        val = '333366'
    } else {
        if (val[0] === '#') {
            val = val.substring(1)
        }
    };
    if (val.length === 3) {
        val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2]
    };
    if (val.search(/^([a-fA-F0-9]{6})$/) > -1) {
        var txt = darkenmydayz(val);
        var list = document.getElementsByClassName('faqpop');
        document.getElementById('menubot').style.background = '#' + val;
        document.getElementById('menudiv').style.background = '#' + txt;
        document.getElementById('omnibar').content = '#' + val;
        for (var i = 0; i < list.length; i++) {
            list[i].style.background = '#' + txt
        };
        for (i = 0; i < fldids.length; i++) {
            document.getElementById(fldids[i]).firstChild.style.background = '#' + txt
        };
        chgCookie(val !== '333366', 'menuback', '#' + val)
    }
}

function getoptval(obj, val) {
    for (var i = 0; i < obj.options.length; i++) {
        if (obj.options[i].value === val) {
            return i
        }
    };
    return 0
}

function loadsets() {
    document.getElementById('opsform').reset();
    var list = getCookie();
    if (getvarval(list, 'leftchat') > 0) {
        document.getElementById('lc').click()
    };
    if (getvarval(list, 'darkchat') > 0) {
        document.getElementById('dc').click()
    };
    if (getvarval(list, 'autochat') > 0) {
        document.getElementById('pc').click()
    };
    if (getvarval(list, 'switchat') > 0) {
        document.getElementById('sc').click()
    };
    if (getvarval(list, 'audichat') > 0) {
        document.getElementById('ac').click()
    };
    if (getvarval(list, 'hidswpch') > 0) {
        document.getElementById('hc').click()
    };
    var val = getvarval(list, 'hidebits');
    var obj = document.getElementById('hidebits');
    if (val) {
        obj.selectedIndex = getoptval(obj, val);
        obj.onchange()
    };
    val = getvarval(list, 'ychattop');
    obj = document.getElementById('ychattop');
    if (val) {
        obj.selectedIndex = getoptval(obj, val);
        obj.onchange()
    };
    val = getvarval(list, 'autoaudi') ? 3 : getvarval(list, 'muteaudi');
    chgCookie(0, 'autoaudi');
    if (val) {
        document.getElementById('muteaudi').selectedIndex = val;
        document.getElementById('muteaudi').onchange()
    };
    val = getvarval(list, 'playrvol');
    chgdefvol(val || 100, 0, !val);
    chgcurvol(val || 100);
    if (getvarval(list, 'autounmu') > 0) {
        document.getElementById('au').click()
    };
    if (getvarval(list, 'chataudi') > 0) {
        document.getElementById('ca').click()
    };
    if (getvarval(list, 'audiovis') > 0) {
        document.getElementById('av').click()
    };
    if (getvarval(list, 'audihidd') > 0) {
        document.getElementById('ha').click()
    };
    if (getvarval(list, 'fscraudi') > 0) {
        document.getElementById('fa').click()
    };
    val = getvarval(list, 'defqua');
    obj = document.getElementById('defqua');
    if (val) {
        obj.selectedIndex = getoptval(obj, val);
        document.getElementById('dq').click()
    };
    val = getvarval(list, 'columnum');
    if (val > 0) {
        theatr.curcol = parseInt(val, 10);
        setchk('cl', true);
        chgCookie(true, 'columnum', val)
    };
    if (getvarval(list, 'playerui') > 0) {
        document.getElementById('vc').click()
    };
    if (getvarval(list, 'autoplay') > 0) {
        document.getElementById('ap').click()
    };
    val = getvarval(list, 'hidemenu');
    if (val > 0) {
        setchk('hm', true);
        chgCookie(true, 'hidemenu', val)
    };
    val = getvarval(list, 'menuopaq');
    obj = document.getElementById('menuopaq');
    if (val) {
        obj.selectedIndex = getoptval(obj, val);
        document.getElementById('hm').onclick()
    };
    if (getvarval(list, 'highplyr') > 0) {
        document.getElementById('hg').click()
    };
    if (getvarval(list, 'setuplnk') > 0) {
        setchk('sl', true);
        chgCookie(true, 'setuplnk')
    };
    val = getvarval(list, 'menuback');
    obj = document.getElementById('themesel');
    for (var i = 0; i < obj.options.length - 1; i++) {
        if (obj.options[i].value === val) {
            break
        }
    };
    obj.selectedIndex = i;
    if (obj.options[i].value === 'c') {
        document.getElementById('colortxt').value = val
    };
    chgtheme();
    obj = document.documentElement;
    if (!obj.requestFullscreen) {
        if (obj.requestFullScreen) {
            obj.requestFullscreen = obj.requestFullScreen;
            document.exitFullscreen = document.exitFullScreen
        } else {
            if (obj.webkitRequestFullscreen) {
                obj.requestFullscreen = obj.webkitRequestFullscreen;
                document.exitFullscreen = document.webkitExitFullscreen
            } else {
                if (obj.webkitRequestFullScreen) {
                    obj.requestFullscreen = obj.webkitRequestFullScreen;
                    document.exitFullscreen = document.webkitExitFullScreen
                } else {
                    if (obj.mozRequestFullscreen) {
                        obj.requestFullscreen = obj.mozRequestFullscreen;
                        document.exitFullscreen = document.mozCancelFullscreen
                    } else {
                        if (obj.mozRequestFullScreen) {
                            obj.requestFullscreen = obj.mozRequestFullScreen;
                            document.exitFullscreen = document.mozCancelFullScreen
                        } else {
                            if (obj.msRequestFullscreen) {
                                obj.requestFullscreen = obj.msRequestFullscreen;
                                document.exitFullscreen = document.msExitFullscreen
                            } else {
                                if (obj.msRequestFullScreen) {
                                    obj.requestFullscreen = obj.msRequestFullScreen;
                                    document.exitFullscreen = document.msExitFullScreen
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    obj = document.getElementsByClassName('faqn');
    for (i = 0; i < obj.length; i++) {
        obj[i].firstChild.firstChild.innerHTML = i + 1 + '. '
    };
    document.addEventListener('fullscreenchange', onfullscr);
    document.addEventListener('webkitfullscreenchange', onfullscr);
    document.addEventListener('mozfullscreenchange', onfullscr);
    document.addEventListener('msfullscreenchange', onfullscr);
    document.getElementById('chatsel').addEventListener('wheel', function (event) {
        nextopt(event.deltaY > 0 ? 1 : -1, 'chatsel', 1)
    });
    document.getElementById('chatmen').addEventListener('wheel', function (event) {
        nextopt(event.deltaY > 0 ? 1 : -1, 'chatmen')
    });
    document.getElementById('hidebits').addEventListener('wheel', function (event) {
        nextopt(event.deltaY > 0 ? 1 : -1, 'hidebits')
    });
    document.getElementById('ychattop').addEventListener('wheel', function (event) {
        nextopt(event.deltaY > 0 ? 1 : -1, 'ychattop')
    });
    document.getElementById('muteaudi').addEventListener('wheel', function (event) {
        nextopt(event.deltaY > 0 ? 1 : -1, 'muteaudi')
    });
    document.getElementById('defqua').addEventListener('wheel', function (event) {
        nextopt(event.deltaY > 0 ? 1 : -1, 'defqua')
    });
    document.getElementById('menuopaq').addEventListener('wheel', function (event) {
        nextopt(event.deltaY > 0 ? 1 : -1, 'menuopaq')
    });
    document.getElementById('themesel').addEventListener('wheel', function (event) {
        nextopt(event.deltaY > 0 ? 1 : -1, 'themesel')
    });
    document.getElementById('defvol').addEventListener('wheel', function (event) {
        updnumval(this, event.deltaY > 0 ? -5 : 5);
        chgdefvol(this.value)
    });
    document.getElementById('volval').addEventListener('wheel', function (event) {
        updnumval(this, event.deltaY > 0 ? -5 : 5);
        chgdefvol(this.value)
    });
    document.getElementById('volval').addEventListener('keydown', function (event) {
        updnumval(this, event.keyCode == 38 ? 5 : (event.keyCode == 40 ? -5 : 0))
    });
    document.getElementById('curvol').addEventListener('wheel', function (event) {
        updnumval(this, event.deltaY > 0 ? -5 : 5);
        chgcurvol(this.value)
    });
    document.getElementById('voltxt').addEventListener('wheel', function (event) {
        updnumval(this, event.deltaY > 0 ? -5 : 5);
        chgcurvol(this.value)
    });
    document.getElementById('voltxt').addEventListener('keydown', function (event) {
        updnumval(this, event.keyCode == 38 ? 5 : (event.keyCode == 40 ? -5 : 0))
    });
    val = getvarval(list, 'sesssave');
    if (val > 0) {
        setchk('ss', true)
    };
    return val
}

function setchk(obj, val) {
    obj = document.getElementById(obj);
    if (val != undefined) {
        obj.checked = val
    };
    obj.chk = obj.checked
}

function onYouTubePlayerAPIReady() {
    var val = loadsets();
    var list = chkforlnk(location.href);
    if (!list[0].length && !list[1].length && val && val !== '1') {
        list = chkforlnk('twitchtheater.tv' + val);
        list[2].push('cht=' + getCookie('currchat'))
    };
    if (theatr.dev) {
        document.getElementById('devdiv').style.display = '';
        document.getElementById('devdiv').onclick = function () {
            mobilescr(-1)
        }
    };
    document.body.removeChild(document.getElementById('eclipse'));
    document.getElementById('chatdiv').style.display = '';
    document.getElementById('playdiv').style.display = '';
    document.getElementById('menudiv').style.display = '';
    if (!list[1].length) {
        list[1] = list[0].slice()
    };
    addstreams(list[0], list[1], list[2]);
    if (chans.length - theatr.hidstr + chats.length < 1) {
        openmenu(1)
    };
    setTimeout(chknsavst, 5000)
}
chans = [];
chats = [];
fldids = [];
vtils = [];
ctils = [];
theatr = {
    curcol: 1,
    hidstr: 0,
    menust: 0,
    menupg: 0,
    opstab: 1,
    seekt: 0,
    seekn: 0,
    vods: 0,
    vodq: 0
};
curcht = -1;
setTimeout(function () {
    if (document.getElementById('eclipse')) {
        document.getElementById('eclipse').innerHTML = 'TwitchTheater was unable to load the required youtube plug-in.<br>' + 'Make sure none of your browser extensions are blocking it.<br>' + 'You may also want to try logging out and back in of your account at youtube.com<br>' + 'If the issue persists please report it at twitter.com/TwitchTheaterTv'
    }
}, 20000);

function srcharay(list, val, chk, i, obj) {
    if (chk) {
        val = val.toLowerCase()
    };
    for (i = i || 0; i < list.length; i++) {
        var txt = obj ? list[i][obj] : list[i];
        if (typeof (val) === 'object') {
            if (txt.search(val) > -1) {
                return i
            }
        } else {
            if ((chk ? txt.toLowerCase() : txt) == val) {
                return i
            }
        }
    };
    return -1
}

function chkforlnk(val) {
    var list = [
        [],
        [],
        []
    ];
    var txt = [];
    var chk = [];
    if (val.indexOf('://') > -1) {
        val = val.substring(val.indexOf('://') + 3);
        txt = val.split('#')[0].split('/');
        val = '.' + txt.shift()
    } else {
        if (val.indexOf('.') > 0 && val.indexOf('/', val.indexOf('.')) > 0) {
            txt = val.split('#')[0].split('/');
            val = '.' + txt.shift()
        }
    };
    if (txt.length) {
        var i = txt.length - 1;
        if (txt[i].indexOf('?') > -1) {
            chk = txt[i].split('?')[1].split('&');
            txt[i] = txt[i].split('?')[0]
        };
        if (txt[i].indexOf('.') < 0) {
            for (i = 0; i < txt.length;) {
                if (!txt[i]) {
                    txt.splice(i, 1)
                } else {
                    i++
                }
            };
            var obj = [/^tt_/i, /^parent=/i, /^referrer=/i, /^filter=/i, /^sort=/i, /^index=/i, /^feature=/i];
            for (i = 0; i < chk.length; i++) {
                for (var indx = 0; indx < obj.length; indx++) {
                    if (chk[i].search(obj[indx]) > -1) {
                        chk.splice(i, 1);
                        i--;
                        break
                    }
                }
            };
            if (val.search(/\.twitchtheater.tv$/i) > -1) {
                if (txt[0]) {
                    i = srcharay(txt, 'p=pwa', true);
                    if (i > -1) {
                        txt.splice(i, 1);
                        theatr.pwa = true
                    };
                    i = srcharay(txt, 'p=dev', true);
                    if (i > -1) {
                        txt.splice(i, 1);
                        theatr.dev = true
                    };
                    i = srcharay(txt, 'c', true);
                    if (i > -1) {
                        list[1] = txt.splice(i, txt.length - i);
                        list[1][0] = ''
                    };
                    list[0] = txt
                } else {
                    val = getvarval(chk, 's', -1);
                    if (val !== -1) {
                        list[0] = val.split('-')
                    };
                    val = getvarval(chk, 'c', -1);
                    if (val !== -1) {
                        list[1] = val.split('-')
                    }
                }
            } else {
                if (val.search(/\.youtube.com$/i) > -1 || val.search(/\.youtu.be$/i) > -1 && txt[0]) {
                    if (srcharay(chk, /^v=/i) < 0) {
                        chk.unshift('v=' + txt[0])
                    };
                    list[0].push(chk.join('&'))
                } else {
                    if (val.search(/\.clips.twitch.tv$/i) > -1) {
                        if (srcharay(chk, /^clip=/i) < 0) {
                            chk.unshift('clip=' + txt[0])
                        };
                        list[0].push(chk.join('&'))
                    } else {
                        if (val.search(/\.player.twitch.tv$/i) > -1) {
                            i = srcharay(chk, /^channel=/i);
                            if (i > -1) {
                                chk[i] = chk[i].replace(/^channel=/i, '')
                            };
                            i = srcharay(chk, /^video=/i);
                            if (i > -1) {
                                chk[i] = chk[i].replace(/^video=/i, 'vod=')
                            };
                            i = srcharay(chk, /^collection=/i);
                            if (i > -1) {
                                chk[i] = chk[i].replace(/^collection=/i, 'col=')
                            };
                            list[0].push(chk.join('&'))
                        } else {
                            if (val.search(/\.twitch.tv$/i) > -1 && txt[0]) {
                                i = srcharay(txt, 'clip', true);
                                if (i > -1 && txt[i + 1]) {
                                    list[0].push('clip=' + txt[i + 1])
                                } else {
                                    i = srcharay(txt, 'videos', true);
                                    if (i > -1 && txt[i + 1]) {
                                        list[0].push('vod=' + txt[i + 1])
                                    } else {
                                        i = srcharay(txt, 'collections', true);
                                        if (i > -1 && txt[i + 1]) {
                                            list[0].push('col=' + txt[i + 1])
                                        }
                                    }
                                };
                                i = srcharay(chk, /^collection=/i);
                                if (i > -1) {
                                    chk[i] = chk[i].replace(/^collection=/i, 'col=')
                                };
                                if (!list[0].length) {
                                    list[0].push(txt[0])
                                };
                                if (chk.length) {
                                    list[0][0] += '&' + chk.join('&')
                                }
                            } else {
                                if (val.search(/\.facebook.com$/i) > -1 && txt[1] === 'videos' && txt[2]) {
                                    list[0].push('fb=' + txt[0] + '&vod=' + txt[2] + (chk.length ? '&' + chk.join('&') : ''))
                                } else {
                                    if (val.search(/\.smashcast.tv$/i) > -1 && txt[0]) {
                                        list[0].push('smash=' + txt[0] + (chk.length ? '&' + chk.join('&') : ''))
                                    } else {
                                        if (val.search(/\.instagib.tv$/i) > -1 && txt[0]) {
                                            list[0].push('igib=' + txt[0] + (chk.length ? '&' + chk.join('&') : ''))
                                        } else {
                                            while (true) {
                                                i = srcharay(chk, /^v=/i);
                                                if (i < 0) {
                                                    break
                                                };
                                                val = srcharay(chk, /^v=/i, 0, i + 1);
                                                list[0].push(chk.splice(i, (val < 0 ? chk.length - i : val - i)).join('&'))
                                            };
                                            if (!list[0]) {
                                                if (txt[0].toLowerCase() === 'live') {
                                                    txt.shift()
                                                };
                                                while (true) {
                                                    i = srcharay(txt, /^layout\d+$/i);
                                                    if (i < 0) {
                                                        list[0] = txt;
                                                        break
                                                    };
                                                    txt.splice(i, 1)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        txt = ['/', ',', ' '];
        for (var i = 0; i < txt.length; i++) {
            if (val.indexOf(txt[i]) > -1 || i > 1) {
                list[0] = val.split(txt[i]);
                break
            }
        }
    };
    return list
}

function gensource(txt) {
    var list = txt.split('&');
    var indx = srcharay(list, /^v=/);
    if (indx > -1) {
        return '//youtube.com/' + (list[indx] === 'v=playlist' ? 'playlist' : 'watch') + '?' + list.join('&')
    };
    indx = srcharay(list, /^fb=/);
    if (indx > -1) {
        txt = srcharay(list, /^vod=/);
        txt = txt > -1 ? '/videos/' + list.splice(txt, 1)[0].split('=')[1] : '';
        return '//facebook.com/' + list.splice(indx, 1)[0].split('=')[1] + txt + (list.length ? '?' + list.join('&') : '')
    };
    indx = srcharay(list, /^smash=/);
    if (indx > -1) {
        return '//smashcast.tv/' + list.splice(indx, 1)[0].split('=')[1] + (list.length ? '?' + list.join('&') : '')
    };
    indx = srcharay(list, /^igib=/);
    if (indx > -1) {
        return '//instagib.tv/' + list.splice(indx, 1)[0].split('=')[1] + (list.length ? '?' + list.join('&') : '')
    };
    indx = srcharay(list, /^clip=/);
    if (indx > -1) {
        return '//clips.twitch.tv/' + list.splice(indx, 1)[0].split('=')[1] + (list.length ? '?' + list.join('&') : '')
    };
    indx = srcharay(list, /^vod=/);
    if (indx > -1) {
        txt = srcharay(list, /^col=/);
        if (txt > -1) {
            list[txt] = list[txt].replace(/^col=/, 'collection=')
        };
        return '//twitch.tv/videos/' + list.splice(indx, 1)[0].split('=')[1] + (list.length ? '?' + list.join('&') : '')
    };
    indx = srcharay(list, /^col=/);
    if (indx > -1) {
        return '//twitch.tv/collections/' + list.splice(indx, 1)[0].split('=')[1] + (list.length ? '?' + list.join('&') : '')
    };
    return '//twitch.tv/' + list[0] + '/videos'
}

function addfromui(indx, val) {
    if (val == undefined) {
        val = document.getElementById(indx > 1 ? 'chttxt' : 'strtxt').value;
        document.getElementById(indx > 1 ? 'chttxt' : 'strtxt').value = ''
    } else {
        if (!val.split) {
            if (indx > 1) {
                val = chans[srcharay(fldids, val)]
            } else {
                val = chats[document.getElementById('chatmen').selectedIndex]
            }
        }
    };
    val = chkforlnk(val);
    if (indx < 1) {
        if (val[1].length < 1) {
            val[1] = val[0].slice()
        }
    } else {
        if (indx < 2) {
            val[1] = []
        } else {
            if (val[1].length < 1) {
                val[1] = val[0]
            };
            val[0] = []
        }
    };
    addstreams(val[0], val[1], val[2])
}

function addstreams(val, txt, list) {
    for (var i = 0; i < val.length;) {
        val[i] = chkstrtxt(val[i]);
        if (!val[i].length) {
            val.splice(i, 1)
        } else {
            var indx = srcharay(chans, val[i], true);
            if (indx < 0) {
                newstream(val[i], i, list);
                indx = chans.length - 1
            };
            if (document.getElementById('v-' + fldids[indx]).plops[5] > 0) {
                chgplavis(fldids[indx], 1)
            };
            i++
        }
    };
    if (theatr.fb && !document.getElementById('fbplugin')) {
        var obj = document.createElement('script');
        obj.id = 'fbplugin';
        obj.src = '//connect.facebook.net/en_US/sdk.js';
        document.head.appendChild(obj)
    };
    var chk = getvarval(list, 'cht') || -1;
    for (var i = 0; i < txt.length;) {
        txt[i] = chkstrtxt(txt[i], 1);
        if (!txt[i].length) {
            txt.splice(i, 1)
        } else {
            var indx = srcharay(chats, txt[i], true);
            if (indx < 0) {
                newchat(txt[i]);
                indx = chats.length - 1
            };
            if (i == chk || chk < 0 && i < 1 && (chats.length < 2 || !val.length || document.getElementById('sc').chk)) {
                chgchat(indx)
            } else {
                if (document.getElementById('pc').chk) {
                    genchat(indx)
                }
            };
            i++
        }
    };
    chk = getvarval(list, 'noh') || (!chats.length && val.length && val.length === chans.length ? 1 : ((txt.length && txt.length === chats.length) || (txt.length && !val.length) ? 0 : -1));
    if (chk > -1) {
        hidechat(chk)
    };
    chk = !chans.length && txt.length && txt.length === chats.length ? 1 : (val.length ? 0 : -1);
    if (chk > -1) {
        chatonly(chk)
    };
    sharelnk();
    layoutchg(2)
}

function chkstrtxt(list, chk) {
    list = list.replace(/\s+/g, '').split('&');
    if (chk) {
        if (srcharay(list, /^clip=/i) > -1 || srcharay(list, /^col=/i) > -1) {
            return ''
        } else {
            if (srcharay(list, /^v=/i) > -1 && srcharay(list, /^list=/i) > -1) {
                return ''
            } else {
                if (srcharay(list, /^fb=/i) > -1) {
                    notifyusr('faq-fcht');
                    return ''
                } else {
                    if (srcharay(list, /^vod=/i) > -1) {
                        return ''
                    }
                }
            }
        };
        if (srcharay(list, /^v=/i) > -1) {
            notifyusr('faq-kcht')
        };
        return list[0]
    };
    return list.join('&')
}

function genminid(list) {
    var i = 0;
    while (true) {
        if (srcharay(list, i) < 0) {
            return i
        };
        i++
    }
}

function newstream(txt, i, list) {
    var val = genminid(fldids);
    fldids.push(val);
    chans.push(txt);
    vtils.push(txt.split('&')[0]);
    document.getElementById('strflds').appendChild(document.createElement('div'));
    document.getElementById('strflds').lastChild.id = val;
    document.getElementById(val).className = 'menurow';
    document.getElementById(val).onmouseover = function (event) {
        chgextctl(event, val)
    };
    document.getElementById(val).innerHTML = '<div class="extops"><img src="/x20/aud.png" alt="" style="margin:0" title="Audio from here only" onclick="chgaudio(' + val + ')"><img src="/x20/cht.png" alt="" title="Show this chat" onclick="addfromui(2,' + val + ')"><img src="/x20/mov.png" alt="" title="Move position up" onclick="moveposup(' + val + ')"><img src="/x20/rel.png" alt="" title="Reload this stream" onclick="relstream(' + val + ',event)"></div>' + '<a href="" target="_blank"><img id="i-' + val + '" alt="" style="margin:0" title="Open source page"></a><input type="text" id="t-' + val + '" disabled><img src="/x20/eye.png" alt="" title="Show/hide stream" onclick="chgplavis(' + val + ')"><img src="/x20/rem.png" alt="" title="Remove without chat" onclick="remstream(' + val + ')"><img src="/x20/rwc.png" alt="" title="Remove with chat" onclick="remstream(' + val + ',1)">';
    document.getElementById('t-' + val).value = txt;
    updsource('i-' + val, txt);
    document.getElementById(val).firstChild.style.display = document.getElementById('pinc').chk ? '' : 'none';
    document.getElementById(val).firstChild.style.background = document.getElementById('menudiv').style.background;
    document.getElementById('playdiv').appendChild(document.createElement('div'));
    document.getElementById('playdiv').lastChild.id = 'v-' + val;
    document.getElementById('playdiv').lastChild.style.background = 'black';
    if (srcharay(list, /^cht=/) > -1) {
        list = getCookie('s' + (chans.length - 1)).split('/');
        list.unshift(i);
        if (list.length > 5) {
            document.getElementById('v-' + val).plops = list
        }
    };
    genplayer(val, i)
}

function chkmuted(val, chk, i) {
    var list = [];
    chk = chk || 0;
    for (i = i || 0; i < fldids.length; i++) {
        if (val != fldids[i]) {
            if (chk == chkaudio(fldids[i], chk)) {
                list.push(i)
            }
        }
    };
    return list
}

function chkaudio(obj, chk) {
    obj = document.getElementById('v-' + obj);
    if (!obj.player) {
        return false
    } else {
        if (chk && obj.plops[5] > 0) {
            return false
        } else {
            if (obj.plops[0] > -1) {
                return obj.plops[2] === 'true' || obj.plops[2] === true
            } else {
                return obj.player.getMuted() || obj.player.isPaused() || obj.player.getEnded()
            }
        }
    }
}

function parstime(txt) {
    var indx = 0;
    var list = txt.split('h');
    if (list.length > 1 && list[0] > 0) {
        indx = parseInt(list[0], 10) * 60 * 60;
        txt = list[1]
    };
    list = txt.split('m');
    if (list.length > 1 && list[0] > 0) {
        indx += parseInt(list[0], 10) * 60;
        txt = list[1]
    };
    list = txt.split('s');
    if (list[0] > 0) {
        indx += parseInt(list[0], 10)
    };
    return indx
}

function varvalobj(list) {
    var obj = {};
    for (var i = 0; i < list.length; i++) {
        if (list[i]) {
            var txt = list[i].split('=');
            obj[txt[0]] = txt[1] ? txt[1] : '1'
        }
    };
    return obj
}

function genplayer(val, i) {
    var obj = document.getElementById('v-' + val);
    var list = chans[srcharay(fldids, val)].split('&');
    var txt = document.getElementById('muteaudi').selectedIndex;
    if (!obj.plops) {
        obj.plops = [i, !document.getElementById('ap').chk, '', '', '', 0]
    };
    if (obj.plops[2] === '') {
        obj.plops[2] = txt ? (txt < 2 || txt > 2) : chkmuted(val).length > 0
    };
    if (obj.plops[4] === '' && document.getElementById('dq').chk) {
        obj.plops[4] = document.getElementById('defqua').options[document.getElementById('defqua').selectedIndex].value
    };
    if (srcharay(list, /^v=/i) > -1) {
        txt = list.splice(srcharay(list, /^v=/i), 1)[0].split('=')[1];
        obj.yt = true;
        if (obj.plops[3] === '' && document.getElementById('vo').chk) {
            obj.plops[3] = document.getElementById('defvol').value
        };
        i = srcharay(list, 'loop', true);
        if (i < 0) {
            i = srcharay(list, 'repeat', true)
        };
        if (i > -1) {
            list.splice(i, 1);
            obj.loop = true
        };
        i = srcharay(list, 'shuffle', true);
        if (i < 0) {
            i = srcharay(list, 'random', true)
        };
        if (i > -1) {
            list.splice(i, 1);
            obj.shuffle = true
        };
        list = varvalobj(list);
        list.autoplay = obj.plops[1];
        list.playsinline = 1;
        if (document.getElementById('vc').chk) {
            list.controls = 0
        };
        if (list.t && !obj.shuffle) {
            obj.t = parstime(list.t);
            list.start = obj.t
        };
        if (obj.t && (list.autoplay === true || list.autoplay === 'true')) {
            theatr.vods++;
            obj.sync = 1
        };
        obj.appendChild(document.createElement('div'));
        obj.lastChild.id = 'yt-' + val;
        obj.player = new YT.Player('yt-' + val, {
            videoId: txt,
            playerVars: list,
            events: {
                "onReady": function (event) {
                    initevnt(val)
                },
                "onStateChange": function (event) {
                    if (event.data == 1) {
                        onlinevt(val)
                    } else {
                        if (!event.data) {
                            endedevt(val)
                        }
                    }
                }
            }
        });
        obj.player.isPaused = function () {
            return this.getPlayerState() === 2 || this.getPlayerState() === 5
        };
        obj.player.getEnded = function () {
            return !this.getPlayerState()
        };
        obj.player.getQuality = function () {
            return this.getPlaybackQuality()
        };
        obj.player.getQualities = function () {
            return this.getAvailableQualityLevels()
        };
        obj.player.setQuality = function (chk) {
            this.setPlaybackQuality(convqual(obj, chk))
        }
    } else {
        if (srcharay(list, /^fb=/i) > -1) {
            txt = gensource(chans[srcharay(fldids, val)]);
            obj.fb = true;
            if (obj.plops[3] === '' && document.getElementById('vo').chk) {
                obj.plops[3] = document.getElementById('defvol').value / 100
            };
            obj.innerHTML = '<div id="fb-' + val + '" class="fb-video" data-href="' + txt + '" data-autoplay="' + obj.plops[1] + '" data-muted="' + obj.plops[2] + (obj.plops[3] !== '' ? '" data-volume="' + obj.plops[3] : '') + (obj.plops[4] ? '" data-quality="' + obj.plops[4] : '') + '" data-allowfullscreen="true"></div>';
            if (window.FB) {
                FB.XFBML.parse(obj)
            } else {
                theatr.fb = 1
            }
        } else {
            if (srcharay(list, /^smash=/i) > -1) {
                txt = list.splice(srcharay(list, /^smash=/i), 1)[0].split('=')[1];
                if (obj.plops[3] === '' && document.getElementById('vo').chk) {
                    obj.plops[3] = document.getElementById('defvol').value
                };
                obj.innerHTML = '<iframe src="//smashcast.tv/embed/' + txt + '?autoplay=' + obj.plops[1] + '&muted=' + obj.plops[2] + (obj.plops[3] !== '' ? '&volume=' + obj.plops[3] : '') + (obj.plops[4] ? '&quality=' + obj.plops[4] : '') + '&parent=' + location.hostname + (document.getElementById('vc').chk ? '&controls=false' : '') + (list.length ? '&' + list.join('&') : '') + '" allow="autoplay;fullscreen" allowfullscreen></iframe>'
            } else {
                if (srcharay(list, /^igib=/i) > -1) {
                    txt = list.splice(srcharay(list, /^igib=/i), 1)[0].split('=')[1];
                    if (obj.plops[3] === '' && document.getElementById('vo').chk) {
                        obj.plops[3] = document.getElementById('defvol').value
                    };
                    obj.innerHTML = '<iframe src="//instagib.tv/embed/video/' + txt + '?autoplay=' + obj.plops[1] + '&muted=' + obj.plops[2] + (obj.plops[3] !== '' ? '&volume=' + obj.plops[3] : '') + (obj.plops[4] ? '&quality=' + obj.plops[4] : '') + '&parent=' + location.hostname + (document.getElementById('vc').chk ? '&controls=false' : '') + (list.length ? '&' + list.join('&') : '') + '" allow="autoplay;fullscreen" allowfullscreen></iframe>'
                } else {
                    if (srcharay(list, /^clip=/i) > -1) {
                        txt = list.splice(srcharay(list, /^clip=/i), 1)[0].split('=')[1];
                        obj.clip = true;
                        if (obj.plops[3] === '' && document.getElementById('vo').chk) {
                            obj.plops[3] = document.getElementById('defvol').value / 100
                        };
                        obj.innerHTML = '<iframe src="//clips.twitch.tv/embed?clip=' + txt + '&autoplay=' + obj.plops[1] + '&muted=false' + (obj.plops[3] !== '' ? '&volume=' + obj.plops[3] : '') + (obj.plops[4] ? '&quality=' + obj.plops[4] : '') + '&parent=' + location.hostname + (document.getElementById('vc').chk ? '&controls=false' : '') + (list.length ? '&' + list.join('&') : '') + '" allow="autoplay;fullscreen" allowfullscreen></iframe>'
                    } else {
                        if (obj.plops[3] === '' && document.getElementById('vo').chk) {
                            obj.plops[3] = document.getElementById('defvol').value / 100
                        };
                        i = srcharay(list, 'loop', true);
                        if (i < 0) {
                            i = srcharay(list, 'repeat', true)
                        };
                        if (i > -1) {
                            list.splice(i, 1);
                            obj.loop = true
                        };
                        if (srcharay(list, /^vod=/i) < 0 && srcharay(list, /^col=/i) < 0) {
                            list[0] = 'channel=' + list[0]
                        } else {
                            i = srcharay(list, /^vod=/i);
                            if (i > -1) {
                                list[i] = list[i].replace(/^vod=/i, 'video=')
                            };
                            i = srcharay(list, /^col=/i);
                            if (i > -1) {
                                list[i] = list[i].replace(/^col=/i, 'collection=')
                            }
                        };
                        list = varvalobj(list);
                        list.autoplay = obj.plops[1];
                        obj.twitch = true;
                        list.player = 'popout';
                        list.playsinline = true;
                        if (document.getElementById('vc').chk) {
                            list.controls = false
                        };
                        if (list.t && !obj.shuffle) {
                            obj.t = parstime(list.t)
                        };
                        if (obj.t && (list.autoplay === true || list.autoplay === 'true')) {
                            theatr.vods++;
                            obj.sync = 1
                        };
                        obj.player = new Twitch.Player('v-' + val, list);
                        obj.player.addEventListener('ready', function () {
                            initevnt(val)
                        });
                        obj.player.addEventListener('playing', function () {
                            onlinevt(val)
                        });
                        obj.player.addEventListener('ended', function () {
                            endedevt(val)
                        })
                    }
                }
            }
        }
    };
    obj.plops[1] = null;
    obj.appendChild(document.createElement('div'));
    obj.lastChild.style.display = 'none';
    obj.lastChild.className = 'plyrhigh'
}

function fbAsyncInit() {
    FB.init({
        xfbml: true,
        version: 'v8.0',
        appId: 724688678095421
    });
    FB.Event.subscribe('xfbml.ready', function (event) {
        if (event.type === 'video') {
            var val = event.id.substring(3);
            var obj = document.getElementById('v-' + val);
            obj.player = event.instance;
            obj.rtio = obj.firstChild.offsetWidth / obj.firstChild.offsetHeight;
            obj.pstate = 'paused';
            obj.updvbox = function () {
                this.firstChild.style.width = this.offsetHeight * this.rtio + 'px'
            };
            obj.player.isPaused = function () {
                return obj.pstate === 'paused' ? true : false
            };
            obj.player.getEnded = function () {
                return obj.pstate === 'ended' ? true : false
            };
            obj.player.setMuted = function (chk) {
                chk ? this.mute() : this.unmute()
            };
            obj.player.getQuality = function () {
                return ''
            };
            obj.player.getQualities = function () {
                return []
            };
            obj.player.setQuality = function (chk) {
                return false
            };
            obj.player.subscribe('paused', function (chk) {
                obj.pstate = 'paused'
            });
            obj.player.subscribe('startedPlaying', function (chk) {
                obj.pstate = 'playing';
                onlinevt(val)
            });
            obj.player.subscribe('finishedPlaying', function (chk) {
                obj.pstate = 'ended';
                endedevt(val)
            });
            obj.updvbox();
            initevnt(val)
        }
    })
}

function initevnt(val) {
    var obj = document.getElementById('v-' + val);
    if (obj.plops[0] > -1) {
        if (!obj.player.getMuted) {
            obj.player.getMuted = obj.player.isMuted
        };
        if (obj.player.playVideo) {
            obj.player.play = obj.player.playVideo;
            obj.player.pause = obj.player.pauseVideo;
            obj.player.seek = obj.player.seekTo;
            obj.player.setMuted = function (chk) {
                chk ? this.mute() : this.unMute()
            }
        };
        if (obj.plops[3] !== '') {
            obj.player.setVolume(obj.plops[3])
        };
        obj.player.setMuted(obj.plops[2] === true || obj.plops[2] === 'true');
        if (obj.plops[4]) {
            obj.player.setQuality(obj.plops[4])
        };
        if (obj.player.isPaused() && obj.plops[1]) {
            obj.player.play()
        };
        obj.plops[0] = obj.plops[0] ? -2 : -1
    }
}

function onlinevt(val) {
    initevnt(val);
    var obj = document.getElementById('v-' + val);
    if (obj.plops[0] != -3) {
        if (obj.plops[0] > -3 && obj.plops[1] === false) {
            obj.player.pause()
        } else {
            if (obj.shuffle) {
                obj.player.setShuffle(true);
                obj.shuffle = false;
                obj.player.playVideoAt(0)
            } else {
                if ((obj.plops[0] > -2 && document.getElementById('muteaudi').selectedIndex > 2) || (obj.plops[0] > -2 && document.getElementById('ac').chk && !chkaudio(val) && !chkmuted(val).length) || (obj.plops[0] < -3 && !document.getElementById('au').chk && !chkmuted(val).length)) {
                    chgaudio(val, -1)
                };
                obj.plops[0] = -3
            }
        }
    };
    if (obj.sync) {
        if (obj.plops[1] === false || theatr.vods < 2) {
            obj.sync = 0;
            theatr.vods--;
            syncplay()
        } else {
            if (!theatr.vodq) {
                showdiag('Trying to sync your videos. Give this a few seconds. Videos with lower quality sometimes sync better.')
            };
            obj.player.seek(obj.t);
            obj.player.pause();
            theatr.vodq++;
            syncplay()
        }
    }
}

function syncplay() {
    if (theatr.vods && theatr.vods === theatr.vodq) {
        setTimeout(function () {
            syncvods(2)
        }, theatr.vods * 1000)
    }
}

function syncvods(chk) {
    for (var i = 0; i < chans.length; i++) {
        var obj = document.getElementById('v-' + fldids[i]);
        if (!chk && obj.t > -1 && obj.plops[0] < 0 && !obj.sync) {
            obj.player.pause();
            theatr.vods++;
            obj.sync = 1
        } else {
            if (chk === 1 && obj.sync) {
                obj.player.play()
            } else {
                if (chk === 2 && obj.sync) {
                    theatr.vods--;
                    theatr.vodq--;
                    obj.sync = 0;
                    obj.player.play()
                }
            }
        }
    };
    if (chk > 1 && document.getElementById('diagtxt').innerHTML.indexOf('sync') > 0) {
        document.getElementById('diagok').click()
    } else {
        if (!chk) {
            if (theatr.vods) {
                setTimeout(function () {
                    syncvods(1)
                }, theatr.vods * 250)
            } else {
                showdiag('No timestamps assigned.');
                theatr.menust = 1
            }
        }
    }
}

function endedevt(val) {
    initevnt(val);
    var obj = document.getElementById('v-' + val);
    if (obj.plops[0] != -4) {
        if (obj.sync) {
            obj.sync = 0;
            theatr.vods--;
            syncplay()
        };
        if (obj.loop) {
            if (!obj.player.getPlaylist || !obj.player.getPlaylist()) {
                obj.player.seek(obj.t || 0);
                obj.player.play()
            } else {
                if (obj.player.getCurrentTime() && obj.player.getPlaylistIndex() + 1 === obj.player.getPlaylist().length) {
                    obj.player.playVideoAt(0)
                }
            }
        } else {
            if (!obj.player.getPlaylist || !obj.player.getPlaylist() || (obj.player.getCurrentTime() && obj.player.getPlaylistIndex() + 1 === obj.player.getPlaylist().length)) {
                if (obj.plops[0] == -3 && !document.getElementById('au').chk && !obj.player.getMuted() && !chkmuted(val).length) {
                    var list = chkmuted(val, 1);
                    if (list.length) {
                        chgaudio(fldids[list[0]], -1)
                    }
                } else {
                    if (obj.plops[0] > -2 && !obj.player.getMuted() && !chkmuted(val).length) {
                        var list = chkmuted(val, 1, srcharay(fldids, val) + 1);
                        if (list.length) {
                            chgaudio(fldids[list[0]], -1)
                        }
                    }
                };
                obj.plops[0] = -4
            }
        }
    }
}

function getcurops(val, chk) {
    var obj = document.getElementById('v-' + val);
    var list = [!obj.player.isPaused(), obj.player.getMuted(), obj.player.getVolume(), obj.player.getQuality(), obj.plops[5]];
    if (chk) {
        list.unshift(chk)
    };
    return list
}

function relstream(val, chk) {
    var obj = document.getElementById('v-' + val);
    if (obj.plops[5] > 0) {
        chgplavis(val)
    } else {
        var list = null;
        if (obj.plops[0] < 0) {
            if (chk.shiftKey) {
                list = getcurops(val, 1)
            };
            obj.player.pause();
            if (obj.player.destroy) {
                obj.player.destroy()
            }
        };
        while (obj.childNodes.length) {
            obj.removeChild(obj.lastChild)
        };
        obj.plops = list;
        genplayer(val, 1)
    }
}

function chknsavst() {
    updtitle();
    var list = getCookie();
    if (theatr.sessid == getvarval(list, 'sessnumb')) {
        var chk = document.getElementById('ss').chk;
        for (var i = 0; i < chans.length; i++) {
            var txt = '';
            if (!chk) {
                var obj = document.getElementById('v-' + fldids[i]);
                if (!obj.player) {
                    txt = (obj.clip ? 'false' : '') + '////' + obj.plops[5]
                } else {
                    if (obj.plops[0] > -1) {
                        txt = obj.plops.slice(1).join('/')
                    } else {
                        txt = getcurops(fldids[i]).join('/')
                    }
                }
            };
            if (getvarval(list, 's' + i) !== txt) {
                chgCookie(!chk, 's' + i, txt)
            }
        }
    };
    setTimeout(chknsavst, 2000)
}

function mobilescr(chk) {
    var obj = document.getElementById('viewport');
    if (chk < 2) {
        obj.chk = 1
    };
    if ((screen.width < 700 || screen.height < 700) && (!obj.chk || chk < 2)) {
        if (!obj.indx) {
            obj.indx = window.innerWidth
        };
        if (chk > 1) {
            chk = theatr.menuopen || (chans.length && chats.length || !chans.length && !chats.length) && screen.width < 680 || (chans.length && (!chats.length || theatr.hidechat) && screen.width < 500) || (chats.length && (!chans.length || theatr.chatonly) && screen.height > 500)
        } else {
            if (chk < 0) {
                chk = obj.content.indexOf('device-width') < 0
            }
        };
        obj.content = chk ? 'width=device-width' : (obj.content ? 'width=' + obj.indx : '')
    };
    if (!document.getElementById('devdiv').style.display) {
        document.getElementById('devdiv').innerHTML = 's: w' + screen.width + ' h' + screen.height + '<br>w: w' + window.innerWidth + ' h' + window.innerHeight + '<br>v: ' + obj.content
    }
}

function layoutchg(chk) {
    if (!document.getElementById('eclipse')) {
        var indx = [window.innerWidth, window.innerHeight];
        mobilescr(2);
        if (indx[0] === window.innerWidth && indx[1] === window.innerHeight) {
            if (chk && !chans.length && !chats.length) {
                hidechat(window.innerWidth < 640)
            };
            theatr.portmode = window.innerWidth < 640 && window.innerWidth < window.innerHeight && !theatr.hidechat && !theatr.chatonly;
            document.body.style.height = window.innerHeight + 'px';
            if (theatr.menuopen) {
                document.getElementById('menudiv').style.width = window.innerWidth < 640 ? '100%' : '340px';
                document.getElementById('menubot').style.maxHeight = '' + (window.innerHeight - 50) + 'px'
            };
            indx = window.innerWidth * 0.5625;
            document.getElementById('playdiv').style.height = theatr.portmode ? indx + 'px' : '100%';
            document.getElementById('chatdiv').style.top = theatr.portmode ? indx + 'px' : '0px';
            document.getElementById('menudiv').style.top = theatr.portmode && !theatr.menuopen ? indx + 'px' : '';
            chatleft();
            updlayout()
        }
    }
}

function updlayout(oddrow) {
    var val = chans.length - theatr.hidstr;
    var obj = document.getElementById('playdiv');
    if (oddrow) {
        setchk('cl', true);
        if (theatr.curcol + oddrow > 0 && theatr.curcol + oddrow < 100) {
            theatr.curcol += oddrow
        }
    };
    if (document.getElementById('cl').chk) {
        var colnum = (theatr.curcol > val) ? val : theatr.curcol;
        var rownum = Math.ceil(val / colnum)
    } else {
        var colnum = 1;
        var rownum = val;
        while (colnum < val) {
            var nexcol = colnum + 1;
            var nexrow = Math.ceil(val / nexcol);
            if (Math.min(obj.offsetWidth / colnum / 16, obj.offsetHeight / rownum / 9) > Math.min(obj.offsetWidth / nexcol / 16, obj.offsetHeight / nexrow / 9)) {
                break
            };
            colnum = nexcol;
            rownum = nexrow
        };
        theatr.curcol = colnum
    };
    document.getElementById('cn').innerHTML = theatr.curcol;
    oddrow = colnum - (colnum * rownum - val);
    var nexcol = 0;
    var nexrow = 0;
    for (var i = 0; i < chans.length; i++) {
        obj = document.getElementById('v-' + fldids[i]);
        if (obj.plops[5] < 1) {
            if (nexrow < 1 && nexcol == oddrow || nexcol == colnum) {
                nexcol = 0;
                nexrow++
            };
            obj.style.width = nexrow < 1 ? (100 / oddrow) + '%' : (100 / colnum) + '%';
            obj.style.height = (100 / rownum) + '%';
            obj.style.top = (100 / rownum * nexrow) + '%';
            obj.style.left = nexrow < 1 ? (100 / oddrow * nexcol) + '%' : (100 / colnum * nexcol) + '%';
            nexcol++;
            if (obj.updvbox) {
                obj.updvbox()
            }
        }
    }
}

function playpause(val, chk) {
    if (theatr.playt) {
        clearTimeout(theatr.playt)
    };
    if (theatr.playm) {
        val = !val
    };
    for (var i = 0; i < chans.length; i++) {
        var obj = document.getElementById('v-' + fldids[i]);
        if (obj.plops[0] > -3) {
            obj.plops[1] = val > 0
        };
        if (!obj.player) {
            if (!chk) {
                chk = 1
            }
        } else {
            if (obj.plops[0] < 0) {
                if (val) {
                    obj.player.play()
                } else {
                    obj.player.pause()
                }
            }
        }
    };
    if (chk > 0) {
        notifyusr('faq-ifrm')
    };
    theatr.playm = !theatr.playm;
    theatr.playt = setTimeout(function () {
        theatr.playm = 0
    }, 1000)
}

function chgaudio(val, chk) {
    for (var i = 0; i < chans.length; i++) {
        var obj = document.getElementById('v-' + fldids[i]);
        if (!obj.player) {
            if (!chk) {
                chk = 1
            }
        } else {
            if (obj.plops[0] > -1) {
                obj.plops[2] = !(val == undefined || val == fldids[i])
            } else {
                obj.player.setMuted(!(val == undefined || val == fldids[i]))
            }
        };
        if (document.getElementById('av').chk && obj.plops[5] == (val == undefined || val == fldids[i])) {
            chgplavis(fldids[i], 1)
        }
    };
    if (document.getElementById('av').chk) {
        updlayout()
    };
    if (val > -1 && document.getElementById('ac').chk) {
        val = chans[srcharay(fldids, val)];
        if (chats.length && val.toLowerCase() !== chats[curcht].toLowerCase()) {
            addstreams([], [val], ['noh=-1'])
        }
    };
    if (chk > 0) {
        notifyusr('faq-ifrm')
    }
}

function chgvolume(txt, chk) {
    for (var i = 0; i < chans.length; i++) {
        var obj = document.getElementById('v-' + fldids[i]);
        if (!obj.player) {
            if (!chk) {
                chk = 1
            }
        } else {
            if (obj.plops[0] > -1) {
                obj.plops[3] = obj.twitch || obj.fb ? txt / 100 : txt
            } else {
                obj.player.setVolume(obj.twitch || obj.fb ? txt / 100 : txt)
            }
        }
    };
    if (chk > 0) {
        notifyusr('faq-ifrm')
    }
}

function chgquality() {
    var val = document.getElementById('curqua');
    for (var i = 0; i < chans.length; i++) {
        var obj = document.getElementById('v-' + fldids[i]);
        if (obj.player) {
            if (obj.plops[0] > -1) {
                obj.plops[4] = val.options[val.selectedIndex].value
            } else {
                if (obj.plops[0] !== -3) {
                    obj.player.setQuality(val.options[val.selectedIndex].value)
                } else {
                    var list = obj.player.getQualities();
                    for (var indx = val.selectedIndex; indx < val.options.length; indx++) {
                        var chk = srcharay(list, convqual(obj, val.options[indx].value), 0, 0, obj.twitch ? 'group' : '');
                        if (chk > -1) {
                            break
                        };
                        notifyusr('faq-chgq')
                    };
                    if (list.length) {
                        obj.player.setQuality(chk > -1 ? val.options[indx].value : 'auto')
                    }
                }
            }
        }
    };
    val.selectedIndex = 0
}

function convqual(obj, txt) {
    if (obj.yt) {
        return txt === 'chunked' ? 'auto' : (txt.indexOf('720') === 0 ? 'hd720' : (txt === '480p30' ? 'large' : (txt === '360p30' ? 'medium' : (txt === '160p30' ? 'tiny' : txt))))
    };
    return txt
}

function chgplavis(val, chk) {
    var obj = document.getElementById('v-' + val);
    obj.plops[5] = (obj.style.width === '0px') ? 0 : 1;
    if (obj.plops[5]) {
        obj.style.width = '0px';
        obj.style.height = '0px'
    };
    document.getElementById(val).style.opacity = obj.plops[5] ? '0.5' : '';
    theatr.hidstr += obj.plops[5] || -1;
    if (!chk) {
        updlayout()
    }
}

function swpplavis() {
    var indx = -1;
    for (var i = 0; i < chans.length; i++) {
        chgplavis(fldids[i], 1);
        if (indx < 0 && document.getElementById('v-' + fldids[i]).plops[5] < 1) {
            indx = i
        }
    };
    if (indx > -1 && document.getElementById('ha').chk) {
        chgaudio(fldids[indx])
    };
    if (indx > -1 && document.getElementById('hc').chk && chats.length) {
        addstreams([], [chans[indx]], [])
    };
    updlayout()
}

function moveposup(val) {
    var indx = srcharay(fldids, val);
    if (indx > 0) {
        document.getElementById('strflds').insertBefore(document.getElementById(val), document.getElementById('strflds').childNodes[indx - 1]);
        fldids.splice(indx - 1, 0, fldids.splice(indx, 1)[0]);
        chans.splice(indx - 1, 0, chans.splice(indx, 1)[0]);
        vtils.splice(indx - 1, 0, vtils.splice(indx, 1)[0]);
        sharelnk();
        updlayout()
    }
}

function remstream(val, txt, chk) {
    var obj = document.getElementById('v-' + val);
    var list = chkmuted();
    var i = srcharay(fldids, val);
    var indx = srcharay(chats, chans[i].split('&')[0], true);
    chans.splice(i, 1);
    vtils.splice(i, 1);
    fldids.splice(i, 1);
    if (obj.plops[0] < 0) {
        obj.player.pause();
        if (obj.player.destroy) {
            obj.player.destroy()
        }
    };
    if (obj.plops[5] > 0) {
        theatr.hidstr--
    };
    document.getElementById('playdiv').removeChild(obj);
    document.getElementById('strflds').removeChild(document.getElementById(val));
    chgCookie(false, 's' + chans.length);
    if (txt && indx > -1) {
        remchat(indx, 1);
        txt = 2
    };
    if (document.getElementById('au').chk != true && list[0] === i && list.length < 2) {
        list = chkmuted(val, 1);
        indx = curcht < 0 ? -1 : srcharay(chans, new RegExp('^' + chats[curcht], 'i'));
        if (indx > -1 && srcharay(list, indx) > -1) {
            chgaudio(fldids[indx], -1)
        } else {
            if (list.length) {
                chgaudio(fldids[list[0]], -1)
            }
        }
    };
    if (obj.sync) {
        theatr.vods--;
        syncplay()
    };
    if (!chk) {
        if (txt > 1 && chans.length && !chats.length) {
            hidechat(1)
        } else {
            if (!chans.length && chats.length) {
                chatonly(1)
            } else {
                if (!chans.length && !chats.length) {
                    chatonly(0)
                }
            }
        };
        sharelnk();
        layoutchg(2)
    }
}

function newchat(txt) {
    chats.push(txt);
    ctils.push(txt);
    document.getElementById('chatsel').disabled = false;
    document.getElementById('chatsel').appendChild(document.createElement('option'));
    document.getElementById('chatsel').lastChild.innerHTML = txt;
    document.getElementById('chatmen').appendChild(document.createElement('option'));
    document.getElementById('chatmen').lastChild.innerHTML = txt;
    document.getElementById('chatfld').style.display = '';
    var obj = document.createElement('div');
    obj.id = 'c-' + txt;
    obj.style.visibility = 'hidden';
    obj.style.width = '100%';
    obj.style.bottom = '0px';
    document.getElementById('chatwin').appendChild(obj);
    topcheers([txt])
}

function topcheers(list) {
    if (!list) {
        list = chats
    };
    for (var i = 0; i < list.length; i++) {
        var obj = document.getElementById('c-' + list[i]);
        if (list[i].search(/^((?!=).)*$/) > -1) {
            var val = parseInt(document.getElementById('hidebits').options[document.getElementById('hidebits').selectedIndex].value, 10);
            obj.style.top = val ? (val > 1 ? '0px' : '-135px') : '-49px'
        } else {
            if (list[i].search(/^v=/i) > -1) {
                var val = parseInt(document.getElementById('ychattop').options[document.getElementById('ychattop').selectedIndex].value, 10);
                obj.style.top = val ? (val > 1 ? '0px' : '-87px') : '-47px'
            } else {
                obj.style.top = '0px'
            }
        }
    }
}

function nextopt(indx, obj, chk) {
    obj = document.getElementById(obj);
    if (obj.options.length > 1) {
        indx = obj.selectedIndex + indx;
        obj.selectedIndex = indx >= obj.options.length ? (chk ? 0 : obj.options.length - 1) : (indx < 0 ? (chk ? obj.options.length - 1 : 0) : indx);
        if (obj.onchange) {
            obj.onchange()
        }
    }
}

function updsource(obj, txt) {
    obj = document.getElementById(obj);
    obj.parentNode.href = gensource(txt);
    if (txt.search(/^v=/i) > -1) {
        obj.src = '/x20/ytb.png'
    } else {
        if (txt.search(/^fb=/i) > -1) {
            obj.src = '/x20/fbk.png'
        } else {
            if (txt.search(/^((?!=).)*$/) > -1 || txt.search(/^clip=/i) > -1 || txt.search(/^vod=/i) > -1 || txt.search(/^col=/i) > -1) {
                obj.src = '/x20/tch.png'
            } else {
                obj.src = '/x20/msh.png'
            }
        }
    }
}

function chgchat(indx) {
    if (curcht > -1) {
        document.getElementById('c-' + chats[curcht]).style.visibility = 'hidden'
    };
    if (indx > -1) {
        document.getElementById('chatsel').selectedIndex = indx
    } else {
        indx = document.getElementById('chatsel').selectedIndex
    };
    document.getElementById('chatmen').selectedIndex = indx;
    updsource('chtsrc', chats[indx]);
    curcht = indx;
    var obj = document.getElementById('c-' + chats[indx]);
    obj.style.visibility = '';
    if (!obj.innerHTML) {
        genchat(indx)
    };
    document.getElementById('chatdiv').style.background = obj.chk ? 'inherit' : '#EEE';
    if (document.getElementById('ca').checked) {
        indx = srcharay(chans, new RegExp('^' + chats[indx], 'i'));
        if (indx > -1 && chkmuted().length && srcharay(chkmuted(-1, 1), indx) > -1) {
            chgaudio(fldids[indx])
        }
    }
}

function genchat(indx) {
    var obj = document.getElementById('c-' + chats[indx]);
    var txt = '<iframe src="';
    if (chats[indx].search(/^v=/i) > -1) {
        obj.chk = document.getElementById('dc').chk;
        txt += (obj.chk ? '//gaming.' : '//') + 'youtube.com/live_chat?' + chats[indx] + '&embed_domain=' + location.hostname
    } else {
        if (chats[indx].search(/^smash=/i) > -1) {
            txt += '//smashcast.tv/embedchat/' + chats[indx].split('=')[1]
        } else {
            if (chats[indx].search(/^igib=/i) > -1) {
                obj.chk = true;
                txt += '//instagib.tv/embed/chat/' + chats[indx].split('=')[1]
            } else {
                obj.chk = document.getElementById('dc').chk;
                txt += '//twitch.tv/embed/' + chats[indx] + '/chat?no-mobile-redirect=true&parent=' + location.hostname + (obj.chk ? '&darkpopout=true' : '&lightpopout=true')
            }
        }
    };
    obj.innerHTML = txt + '"></iframe>'
}

function relchat() {
    var indx = document.getElementById('chatmen').selectedIndex;
    var obj = document.getElementById('c-' + chats[indx]);
    if (indx == curcht) {
        obj.removeChild(obj.firstChild)
    };
    chgchat(indx)
}

function remchat(indx, chk) {
    if (indx == undefined) {
        indx = document.getElementById('chatmen').selectedIndex
    };
    document.getElementById('chatwin').removeChild(document.getElementById('c-' + chats[indx]));
    document.getElementById('chatsel').remove(indx);
    document.getElementById('chatmen').remove(indx);
    chats.splice(indx, 1);
    ctils.splice(indx, 1);
    if (!chats.length) {
        curcht--;
        document.getElementById('chatfld').style.display = 'none';
        document.getElementById('chatsel').disabled = true;
        document.getElementById('chatdiv').style.background = 'inherit'
    } else {
        if (indx < curcht) {
            curcht--
        } else {
            if (indx == curcht) {
                curcht = -1;
                var list = chkmuted();
                indx = -1;
                for (var i = 0; i < list.length; i++) {
                    indx = srcharay(chats, chans[list[i]].split('&')[0], true);
                    if (indx > -1) {
                        break
                    }
                };
                if (indx > -1) {
                    chgchat(indx)
                } else {
                    chgchat(0)
                }
            }
        }
    };
    if (!chk) {
        if (chans.length && !chats.length) {
            hidechat(1);
            chatonly(0)
        } else {
            if (!chans.length && !chats.length) {
                chatonly(0)
            }
        };
        sharelnk();
        layoutchg(2)
    }
}

function updtitle() {
    var txt = [];
    for (var i = 0; i < vtils.length; i++) {
        var obj = document.getElementById('v-' + fldids[i]);
        if (obj.player && obj.player.getVideoData && obj.player.getVideoData().title) {
            if (vtils[i] !== obj.player.getVideoData().title) {
                vtils[i] = obj.player.getVideoData().title;
                document.getElementById('t-' + fldids[i]).value = vtils[i]
            };
            for (var indx = 0; indx < chats.length; indx++) {
                if (ctils[indx] === 'v=' + obj.player.getVideoData().video_id) {
                    ctils[indx] = vtils[i];
                    document.getElementById('chatsel').childNodes[indx].innerHTML = ctils[indx];
                    document.getElementById('chatmen').childNodes[indx].innerHTML = ctils[indx]
                }
            }
        };
        if ((!theatr.chatonly || theatr.hidechat) && obj.plops[5] < 1) {
            txt.push(vtils[i])
        }
    };
    if (!txt.length && !theatr.hidechat) {
        txt = ctils.slice();
        if (curcht > 0) {
            txt.unshift(txt.splice(curcht, 1))
        }
    };
    document.title = (txt.length ? txt.join(' - ') + ' - ' : '') + 'TwitchTheater.tv'
}

function sharelnk() {
    var txt = chats.slice();
    if (curcht > 0) {
        txt.unshift(txt.splice(curcht, 1))
    };
    showctls();
    var val = chans.join('/');
    txt = txt.join('/');
    var chk = document.getElementById('ss').chk;
    if (chk || chans.length + chats.length < 1) {
        chgCookie(chk, 'sesssave');
        chgCookie(false, 'currchat');
        chgCookie(false, 'sessnumb')
    } else {
        chgCookie(true, 'sesssave', (chans.length ? '/' + val : '') + '/c/' + chats.join('/'));
        chgCookie(curcht > 0, 'currchat', curcht);
        chk = new Date();
        theatr.sessid = chk.getTime();
        chgCookie(true, 'sessnumb', theatr.sessid)
    };
    for (i = 0; i < chats.length; i++) {
        if (srcharay(chans, new RegExp('^' + chats[i], 'i')) < 0) {
            break
        }
    };
    if (document.getElementById('sl').chk && val !== txt) {
        val = val + '/c/' + txt
    } else {
        if (i < chats.length) {
            val = val + '/c/' + chats.join('/')
        }
    };
    document.getElementById('shrlnk').lastChild.href = '//twitchtheater.tv' + (chans.length ? '/' : '') + val;
    document.getElementById('shrlnk').lastChild.innerHTML = 'twitchtheater.tv' + (chans.length ? '/' : '') + val
}
