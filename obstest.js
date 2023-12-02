class Loader {
  init() {
    const observer = new WebKitMutationObserver(mutationRecords => {
      mutationRecords.forEach(mutationRecord => {
        mutationRecord.addedNodes.forEach(addedNode => {
          const [matchedNode] = addedNode.src && addedNode.src.match(/agario\.core\.js.+/i) || [];
          if (matchedNode) {
            addedNode.remove();
            const core = this.core.toString();
            const script = document.createElement("script");
            script.id = "agario.core.js";
            script.setAttribute("path", `/${matchedNode}`);
            script.innerHTML = core.substring(core.indexOf("{") + 1, core.lastIndexOf("}"));
            document.head.appendChild(script);
            observer.disconnect();
          }
        });
      });
    });
    observer.observe(document, {
      childList: true,
      subtree: true
    });
  }
  core() {
    // core:start
    (async () => {
      class u {
        constructor() {
          this.developer = "Raga Games";
          this.gameModes = [];
          this.skins = [];
          this.shops = [];
          this.agarioSkins = [];
          this.gameMode = null;
          this.pendingGameMode = null;
          this.isClean = false;
          this.isIgnoringTeams = false;
          this.isSwitchingGameMode = false;
          this.isUiRefreshed = false;
          this.isSetup = false;
          this.isLogged = false;
          this.isAuthSent = false;
          this.profileImage = null;
          this.profileName = null;
          this.ident = null;
          this.money = null;
          this.skin = null;
          this.minions = null;
          this.friends = [];
          this.ownedSkins = [];
          this.listenLoop = null;
          this.settings = [{
            ident: "connection",
            section: "general",
            name: "Connection",
            value: localStorage.getItem("connection") && JSON.parse(localStorage.getItem("connection")).value || "0",
            toggle: false,
            command: [{
              value: "0",
              name: "Europe"
            }, {
              value: "1",
              name: "Cloudflare"
            }, {
              value: "2",
              name: "America"
            }, {
              value: "3",
              name: "Asia"
            }]
          }, {
            ident: "viewport",
            section: "general",
            name: "Viewport",
            value: "0",
            toggle: false,
            command: [{
              value: "0",
              name: "Max"
            }, {
              value: "1",
              name: "Large"
            }, {
              value: "2",
              name: "Medium"
            }, {
              value: "3",
              name: "Small"
            }]
          }, {
            ident: "player-split",
            section: "player",
            name: "Split",
            value: " ",
            toggle: false,
            command: () => {
              window.core.split();
            }
          }, {
            ident: "player-eject",
            section: "player",
            name: "Eject Mass",
            value: "w",
            toggle: false,
            command: () => {
              window.core.eject();
            }
          }, {
            ident: "player-macro",
            section: "player",
            name: "Macro Feed",
            value: "a",
            toggle: true,
            command: (af = false) => {
              if (this.gameModes.find(ah => ah.type === this.gameMode)) {
                window.core.proxyMobileData(new Uint8Array([!af ? 150 : 151]));
              }
            }
          }, {
            ident: "player-stop",
            section: "player",
            name: "Stop Cell",
            value: "d",
            toggle: false,
            command: () => {
              if (this.gameModes.find(aj => aj.type === this.gameMode)) {
                window.core.proxyMobileData(new Uint8Array([144]));
              } else {
                this.isPlayerStopped = !this.isPlayerStopped;
              }
            }
          }, {
            ident: "player-split-2",
            section: "player",
            name: "Double Split",
            value: "q",
            toggle: false,
            command: () => {
              if (this.gameModes.find(al => al.type === this.gameMode)) {
                window.core.proxyMobileData(new Uint8Array([154]));
              } else {
                window.core.split();
                setTimeout(() => {
                  window.core.split();
                }, 80);
              }
            }
          }, {
            ident: "player-split-3",
            section: "player",
            name: "Triple Split",
            value: "r",
            toggle: false,
            command: () => {
              if (this.gameModes.find(ao => ao.type === this.gameMode)) {
                window.core.proxyMobileData(new Uint8Array([155]));
              } else {
                window.core.split();
                setTimeout(() => {
                  window.core.split();
                  setTimeout(() => {
                    window.core.split();
                  }, 80);
                }, 80);
              }
            }
          }, {
            ident: "player-split-4",
            section: "player",
            name: "Quadruple Split",
            value: "tab",
            toggle: false,
            command: () => {
              if (this.gameModes.find(ar => ar.type === this.gameMode)) {
                window.core.proxyMobileData(new Uint8Array([156]));
              } else {
                window.core.split();
                setTimeout(() => {
                  window.core.split();
                  setTimeout(() => {
                    window.core.split();
                    setTimeout(() => {
                      window.core.split();
                    }, 80);
                  }, 80);
                }, 80);
              }
            }
          }, {
            ident: "player-split-max",
            section: "player",
            name: "Max Split",
            value: "e",
            toggle: false,
            command: () => {
              if (this.gameModes.find(aw => aw.type === this.gameMode)) {
                window.core.proxyMobileData(new Uint8Array([157]));
              } else {
                window.core.split();
                setTimeout(() => {
                  window.core.split();
                  setTimeout(() => {
                    window.core.split();
                    setTimeout(() => {
                      window.core.split();
                      setTimeout(() => {
                        window.core.split();
                      }, 80);
                    }, 80);
                  }, 80);
                }, 80);
              }
            }
          }, {
            ident: "player-h-stop",
            section: "player",
            name: "Horizontal Line Stop",
            value: "t",
            toggle: false,
            command: () => {
              if (this.gameModes.find(bc => bc.type === this.gameMode)) {
                window.core.proxyMobileData(new Uint8Array([145]));
              }
            }
          }, {
            ident: "player-v-stop",
            section: "player",
            name: "Vertical Line Stop",
            value: "y",
            toggle: false,
            command: () => {
              if (this.gameModes.find(bf => bf.type === this.gameMode)) {
                window.core.proxyMobileData(new Uint8Array([146]));
              }
            }
          }, {
            ident: "minion-split",
            section: "minion",
            name: "Split",
            value: "x",
            toggle: false,
            command: () => {
              if (this.gameModes.find(bh => bh.type === this.gameMode)) {
                window.core.proxyMobileData(new Uint8Array([147]));
              }
            }
          }, {
            ident: "minion-eject",
            section: "minion",
            name: "Eject Mass",
            value: "c",
            toggle: false,
            command: () => {
              if (this.gameModes.find(bj => bj.type === this.gameMode)) {
                window.core.proxyMobileData(new Uint8Array([148]));
              }
            }
          }, {
            ident: "minion-macro",
            section: "minion",
            name: "Macro Feed",
            value: "z",
            toggle: true,
            command: (bk = false) => {
              if (this.gameModes.find(bm => bm.type === this.gameMode)) {
                window.core.proxyMobileData(new Uint8Array([!bk ? 152 : 153]));
              }
            }
          }, {
            ident: "minion-invert",
            section: "minion",
            name: "Invert",
            value: "s",
            toggle: false,
            command: () => {
              if (this.gameModes.find(bo => bo.type === this.gameMode)) {
                window.core.proxyMobileData(new Uint8Array([149]));
              }
            }
          }, {
            ident: "minion-split-2",
            section: "minion",
            name: "Double Split",
            value: "v",
            toggle: false,
            command: () => {
              if (this.gameModes.find(bq => bq.type === this.gameMode)) {
                window.core.proxyMobileData(new Uint8Array([158]));
              }
            }
          }, {
            ident: "minion-split-max",
            section: "minion",
            name: "Max Split",
            value: "shift",
            toggle: false,
            command: () => {
              if (this.gameModes.find(bs => bs.type === this.gameMode)) {
                window.core.proxyMobileData(new Uint8Array([159]));
              }
            }
          }];
          this.changingSettings = null;
          this.isPlayerStopped = false;
          this.tournamentMode = null;
          this.tournament = {};
          this.survivorCoins = null;
          this.serverFatMinions = null;
          this.defaultProfile = RegExp().constructor.name[5] + "true"[1] + ("" + [][[]])[3] + "false"[1] + "object"[4] + "true"[0];
          this.canvas = document.getElementById("canvas").getContext("2d");
          this.hud = {
            counter: document.createElement("canvas").getContext("2d"),
            tournamentCounter: document.createElement("canvas").getContext("2d"),
            images: {
              gameMode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABOElEQVQ4jYWTPU7DYAyGMyAqNiYIBcRQqczd4ACMbGz0AB1YmLgB6iXo1gvAASgM7cLCr5jK1AlBmQH1QS+yJTfJB5YsJbbf5/tsJxkwZd5egBzICp5bLtp7RrUNgVoALALXVZUR0AZG4b0XAL0QH1ltCaDEZoDMgBZwHGpugK14kADjBKQL7AFfiQNkYx/OsABZBxrAa+pk06x5jxrYmSWegQ3g/g9xH1iStriqI2AbOE+Iv4GTqInihrVzmuj5zWaSW20JsA9MbPpF8SPQtMFOrLYEWLD9fgK7QXxhM9mxXNtq5wArwC1wGCAza2cZeAriA+ABqDtAYgV8SA7RVdWvXM8u9u9C26oLcBXWI7uzK6pPDUuuZ8WUizYQ4CNEdNXVij/RXTnVuE0V7Bjk8h9xhAx+NdD5Aav6iVHfXkoVAAAAAElFTkSuQmCC",
              logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAjCAYAAACD1LrRAAAB4klEQVRYhe2Yr0sEQRTHn4pgOeFQUcQgWBUMgj+CwT9ABE0mu0nUcu0MFoNFMBqtilw40Go1GOQODlGD4cIFixj8yMhbWO52Z+etJxa/MLA3+77fzw07O/e4HkByaFJELtW2JiKP5ggHNoxe4JhOubk+S1ZoYQEoAa0EaKSW1hS6CZ4DPj3QSJ9a+yPwOFCMfXb74cgDPdKaqL6oGSbwjoa9Agtt9yaA6xjwRufiNfPqRbMywcvAU8JqLoHhttotHfG5IeAiwf+k2R3gMaAa8AwPgZGEFYzovax9UFXWN3g/ABjXSQL4xJix70z1wOImsOHZjOtaE6K6MzwEFB4YDoeDgLyHLHAFGDWebqKeSl5wKQewfZTSwL2eY7yW59cjNMMHHugCODXDB/5V/YP/wX8Cfu9CfmqGD7zYBXB6RsZZfQ/M5jgqZ9WbelZnPeNpEbkTkXMRGQxYYUFr79SbLqDm+WZxue5iz7PK3cBO1KnmDJvAR6DB6QVYiQHd9bPB71ibkbkfODWYnc50WHSqrI4ucwq4NYaF6FazM/vqVUP/5FNTs4Ib+miUfwAt+7JD3knXM18ZgFcpvbcZHI0loOEBNrQmKC9PA7fd9vq5azdnysn7j4A7oWb0+l5E3kxuEfkCKdARvF9Gsr4AAAAASUVORK5CYII=",
              minions: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhUlEQVQ4jc1RQQ6AIAzbPPgA/bRHvXvzfewLNRggc044aKJNliwtNNDSPwCgB7AACAAk7ZGjNK5eHg9gxhWTMnB1bRCcA0EZuHq82z3NMBtsjraqva6rkKQRotyFaKfVyjE1g1YrxYCzgUFMeDCcENGoCWZ+rwWLVitnVEK8a8X79hcgoh0uZVrRbeA4UAAAAABJRU5ErkJggg=="
            },
            utils: {
              roundedRectangle: (bt, bu, bv, bw, bx, bz) => {
                bt.beginPath();
                bt.moveTo(bu + bz, bv);
                bt.arcTo(bu + bw, bv, bu + bw, bv + bx, bz);
                bt.arcTo(bu + bw, bv + bx, bu, bv + bx, bz);
                bt.arcTo(bu, bv + bx, bu, bv, bz);
                bt.arcTo(bu, bv, bu + bw, bv, bz);
                bt.closePath();
                return bt;
              },
              getGameMode: () => {
                if (this.gameMode === "ffa") {
                  return "FFA";
                }
                if (this.gameMode === "battleroyale") {
                  return "Battle Royale";
                }
                if (this.gameMode === "teams") {
                  return "Teams";
                }
                if (this.gameMode === "experimental") {
                  return "Experimental";
                }
                if (this.gameMode === "party") {
                  return "Party";
                }
                const cc = this.gameModes.find(cd => cd.type === this.gameMode);
                if (cc) {
                  return cc.shortName;
                }
                return "Loading...";
              },
              getMinions: () => {
                if (this.isLogged) {
                  return this.minions.loaded + this.minions.fatAmount + " / " + (this.minions.amount + this.minions.fatAmount);
                }
                return "Sign in";
              },
              getSurvivorCoins: () => {
                if (this.survivorCoins) {
                  return this.survivorCoins + " RC";
                }
                return "0 RC";
              }
            }
          };
          this.loadConfig().then(() => {
            this.updateCss();
            this.hookListeners();
            this.startObserver();
          }).catch(() => {});
        }
        async loadConfig() {
          const cj = await fetch("https://minions.raga.pw/ragamode/config", {
            cache: "no-store"
          }).then(ck => ck.json()).catch(() => {});
          if (!cj) {
            return Promise.reject();
          }
          this.gameModes = cj.gameModes;
          this.skins = cj.skins;
          this.shops = cj.shops;
          return Promise.resolve();
        }
        updateCss() {
          let cm = "";
          cm += "#adsTop, #adsBottom, #adsLeft, #adsRight, #adsGameOver, #captchaWindowV3, .discord { visibility: hidden; }";
          cm += "#new-skinButton { position: relative; left: 25px; cursor: pointer; }";
          cm += "#new-skinButton>.skinWrapper { position: absolute; width: 46px; height: 46px; border: 3px solid rgb(131, 131, 131); -webkit-mask-image: -webkit-radial-gradient(white, black); overflow: hidden; }";
          cm += ".raga-coins { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA39pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozZTVmOWZjNi1iZDUzLTkzNDktODQ1My0zODRkYmJhZTczZjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjMwOUIyOTAxQjY2MTFFQkJEM0JBOEE4Nzc1NDVBMjUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjMwOUIyOEYxQjY2MTFFQkJEM0JBOEE4Nzc1NDVBMjUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFkOWU5YTc1LTU4OTctYTE0ZS1hMmE1LWNmZjBmY2I4Y2U5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjUyMWI4N2UxLWVmYzAtZTQ0Ni04NDU1LTM5NDVkMDRjNGQ4NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psqsbw4AAAM9SURBVHjaXFRNSFRRFP7efc8ZdX511ETFNFJMxYVSRoRtSyKkyFXUIqGV0bIWQpsIWgtBq0KCWhRGJLUpNwWJuMn8SVFL08bxZ5z/0Zl5fXfeHXjMhY/33r3nfuec75zztMziBMyjJIy/n4CjOLEDwFGGbPISEuEB5Mw2HMUAwwXoYhVl7nE4vB+QSUZQWkNbHQh0ASUeGGZiF6YQQDoCZEkW27iG2PYDaLs98OUAL+2dxBERwWnsYRC56jmUVz6BKH0BaDxLAodxGNCM/DeEriG89hSxpTtoPAROca+S4HH+3CQyxAGxEGrH6u5zhtMPf8staCIFaappOWmtIb75DLEfQ+jlZ6u6nFUE9iUdnCfqee/b7CAiDgOBnkEGkxV6eAHGn4kb2JkcwlkatSmCrIrIsEFX+zLlE4o0OnMVoel7yMRoEp51ITg9gibTiuhQRSCJqDtCtqjKiRr1Lu2aiCDx6/t9CIwZSIUo6HoLOriZs12UkawQMxWAf99KO062kwnkMyhoKDNZ2apCInhTIJUaQIAbfpVCYZlKbB+JrvB5nWgm0bKHqcmCKeduoppIJfoFktsd+fLrRUJnVJoOgnzYVM+yqNUqprITKpD0bouBTMSLkiIiqVdKQYr9hUiyaSvYh32q7+ySyPvZqFugxHeQv2Bf0ltCasSU2vm8LCOKW21RX0QE5VD3RAVKq2cRLtJLy3c7jZwWQYXSZQOWXprNVhLL+87AkuAYvs1rsV+kGycEXs4pgzOlowa1H1GRFzKQ5Nv5cX4vUF79BqJ5AT9tHqX4LbCqyGppadWkA2oCCllI5/Pyu24b7tqXAt7WBGp7H+I3mRZV9QqGxYVx2KKS76uyYYljZx7B1xYSMNiIlZ2vUXluFFM8mLONj1lEZtqcLBNfCU/3K1R1j0J38YoUhHMOV+0wMl0mphaHsZm2qhgoik6mL393C8Qa4eocg7fhNjQzh1xWkuUshSXcDXc5/Z8R3BvB1no3PLb/2aESW06F1jgPr/8xXA1jksTiMEnmZPuadGlQ6SxLWF43Dn/HR6T+XUAseBH7rj6kdzxwViWo1zQqHO/gOT6J9F4UeimJGbpexgwM/BdgACxeGGYM4tWGAAAAAElFTkSuQmCC'); background-position: 0 0; }";
          cm += ".new-user-container, .new-offers-container { padding: 20px; }";
          cm += ".new-user-container .user-picture { float: left; width: 56px; height: 56px; margin-right: 6px; border: 2px solid #cccccc; border-radius: 5px; }";
          cm += ".new-user-container .currency-container, .leagues-dialog .currency-container { position: relative; left: 70px; width: 130px; height: 23px; margin-bottom: 10px; border: 2px solid #54c800; border-radius: 5px; cursor: pointer; }";
          cm += ".new-user-container .label, .leagues-dialog .label { position: absolute; right: 53px; width: 100px; height: 30px; line-height: 24px; text-align: right; font-size: 13px; color: #000000; }";
          cm += ".new-user-container .icon, .leagues-dialog .icon { position: absolute; top: 2px; right: 28px; }";
          cm += ".new-user-container .plus, .leagues-dialog .plus { position: absolute; top: 0; right: 0; width: 25px; height: 100%; text-align: center; background-color: #54c800; border-radius: 2px; border-top-left-radius: 0; border-bottom-left-radius: 0; }";
          cm += ".new-user-container .plus>span, .leagues-dialog .plus>span { display: block; line-height: 25px; text-align: center; font-size: 25px; color: #ffffff; }";
          cm += ".new-user-container .ident-container { position: relative; left: 10px; width: 280px; height: 23px; font-size: 13px; }";
          cm += ".new-user-container .ident-container .ident { user-select: all; }";
          cm += ".new-user-container .user-name { position: absolute; margin-top: 7px; vertical-align: middle; text-align: left; font-weight: bold; font-size: 22px; letter-spacing: -0.4px; overflow: hidden; }";
          cm += ".new-user-container .progress-bar-container { position: relative; top: 42px; width: 100%; height: 30px; text-align: center; border: 2px solid #54c800; border-radius: 5px; }";
          cm += ".new-user-container .progress-bar { position: absolute; top: 0px; height: 100%; background-color: #54c800; border-radius: 0 4px 4px 0; }";
          cm += ".new-user-container .progress-bar-text { position: absolute; left: 0px; width: 100%; line-height: 32px; font-weight: bold; font-size: 14.5px; color: #343434; }";
          cm += ".new-offers-container .buttons-container { display: flex; flex-wrap: nowrap; justify-content: space-between; }";
          cm += ".new-offers-container .buttons-container>div { width: 93px; height: 75px; text-align: center; color: #ffffff; border-radius: 5px; cursor: pointer; }";
          cm += ".new-offers-container .buttons-container>div.shop { background-color: #54c800; }";
          cm += ".new-offers-container .buttons-container>div.shop:hover { background-color: #3b8a02; }";
          cm += ".new-offers-container .buttons-container>div.settings { background-color: #00c1f1; }";
          cm += ".new-offers-container .buttons-container>div.settings:hover { background-color: #0293b7; }";
          cm += ".new-offers-container .buttons-container>div.community { background-color: #c03ff7; }";
          cm += ".new-offers-container .buttons-container>div.community:hover { background-color: #8a2fb1; }";
          cm += ".new-offers-container .buttons-container>div>.label { position: relative; bottom: -45px; width: 100%; font-weight: bold; font-size: 12px; }";
          cm += ".new-offers-container .buttons-container>div>.Icon-Store { position: absolute; transform: matrix(0.65, 0, 0, 0.65, -39, 10); }";
          cm += ".new-offers-container .buttons-container>div>.controller { position: absolute; transform: matrix(0.8, 0, 0, 0.8, -42, 20); }";
          cm += ".new-offers-container .buttons-container>div>.Icon-Leaderboards { position: absolute; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAkCAYAAADLsGk3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDgyREM0NzkyOERFMTFFQkFBNjZBMEYxODEyNDIyQUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDgyREM0N0EyOERFMTFFQkFBNjZBMEYxODEyNDIyQUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowODJEQzQ3NzI4REUxMUVCQUE2NkEwRjE4MTI0MjJBQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowODJEQzQ3ODI4REUxMUVCQUE2NkEwRjE4MTI0MjJBQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpmB7ZgAAAPESURBVHja1NlZbExRGMDxa6wpVbXUTuwq1hA7QShFqFgiPAlBeCieCLE+eCJEY4+ERyKI9QHVkKjYYheUCmptiDa1tuP/8U1yM+ZuRzHzJb+knXvPuee798zMd85Y4XDYMlAbo7EZd8K/YrlBP0u07SPsxASkmIwpaIOu2IDnOoByXMRSpBsMoDOWIR8V2udrbEGPIH1V+ZmNd/TESkxECG+wCbvwTs9ph+5oi+ZoiDqooce/ohTFeIHHuIkCyCAaYRay0UxfO4o1uOY5Qo9M6yEH3/VufUA2qiEVs3AIz2x3NEhU6NM9gtloALm5c/BGz5Frb0N906klj73AdtGDOn0ycBxfwpUfX3EKmWiLfbZjhehmMrVOYoxOiR14hHnoYv2beICtaImFqIVcjIh1slMiE3BE/76Lauho/Z+QG/gZXfX/aTjgN5E8DLXiMy5hICrsL4ZinDgyjpOQ6Iex0S/GSmSuFf8x12tqyXfBDdSO80S+oBfuOT2RSQmQhERNTHabWlOsxInJ9vHbE+mGPgmUSE+dXr8lMgpVrcSK0bESyTDs7BUu4KFB2wJt+9Lw2qOii8aGeGtQG61FHe0jhKko9tFOis8ZqKptk7DC4PrST1N70TjcoJP1DgXcWB9tJzm0XWUwjkx7IksDNpYSO82lcj7h0vaMS7tU26LNb6yWtpH3SO+Ac/O6Lq6cItflWJ7Lsfe4GnAsvSNv9upID9i41ON4ieExP31HR2ckSSItVJBo43G8o+ExS5fKQUKWxS0lkfZICdi4l0uFLH1lubQdr+t5p8q2b8CxJEkOoT9YMG1Bkxivb/R4Yi104yK6PJLkchwqcq/oJCu/DoaJyI5JPjbrm192TuZjsI+2M7XSlqXsM+0r22BaRaK9lPGHdZsnkeNESO+k425RgiTSTBJJczlBFllv42CgxTp9naKRJJLq8VG4G4f/YxLHsN3jAyQlpLsSTlEXi3FW97jy/2ECVzBOE1mEei7nXo5Ungd91DSyW14X/bAfH//CTmOpjmWQVtU5PtocRXKkWJO93E0+Gskeb5a2SdayfQ9uo8xg4GX6s8ReTNcbJX2PwxMf7beiRqwt0yz9Xmjl47Gv1cce1pVlE31PtbbtxidH7caX2Hbjn+IJilCu52Tqrn9/j+sX6XQ74LYbn6LrAj8LrZcYb/hjkV2Gz/JdFm3rtNz3vRsv2/jzkOcybWS3vnklJNIY9x2u8QnnsUBXsn/0Q48UlsMwRMuJ1lqsySfZuUr6lBqA0/iGQtzCee3/gVfjHwIMACPnEzvUGZNMAAAAAElFTkSuQmCC'); background-position: 0 0; transform: matrix(0.65, 0, 0, 0.65, -59, 10); }";
          cm += "#mainui-play { margin-bottom: 0; }";
          cm += "#mainui-modes .gamemodes { flex-wrap: wrap; }";
          this.gameModes.forEach(cn => {
            cm += "#mainui-modes .gamemodes ." + cn.type + " { height: 60px; margin-top: 7px; flex-basis: 139px; flex-direction: column; background-color: #e2e2e2; }";
            cm += "#mainui-modes .gamemodes ." + cn.type + ":hover, #mainui-modes .gamemodes ." + cn.type + ".active { color: #ffffff; background-color: " + cn.color + "; }";
            cm += "#mainui-modes .gamemodes ." + cn.type + ">span { padding-top: 5px; font-size: 13px; }";
          });
          cm += ".partymode-info { top: 90px !important; left: 12px !important; }";
          cm += "#leagues-app { display: block; }";
          cm += ".leagues-dialog h1 { margin-bottom: 0; }";
          cm += ".leagues-dialog .currency-container { left: 671px; margin-top: -34px; }";
          cm += ".raga-mode-shop { width: 100%; margin-top: 25px; display: table; border-collapse: separate; border-spacing: 0 10px; }";
          cm += ".raga-mode-shop .coins-entry { display: table-row; background-color: #ffde92; cursor: pointer; }";
          cm += ".raga-mode-shop .coins-entry:hover { background-color: #fff0c8; }";
          cm += ".raga-mode-shop .coins-entry:hover .block { border: 1px solid #fff0c8; }";
          cm += ".raga-mode-shop .coins-entry:hover .block.green { background-color: #57b600; }";
          cm += ".raga-mode-shop .coins-entry .block { height: 60px; display: table-cell; text-align: center; font-weight: bold; font-size: 20px; vertical-align: middle; border: 1px solid #ffde92; }";
          cm += ".raga-mode-shop .coins-entry .block.first { border-top-left-radius: 5px; border-bottom-left-radius: 5px; }";
          cm += ".raga-mode-shop .coins-entry .block.last { border-top-right-radius: 5px; border-bottom-right-radius: 5px; }";
          cm += ".raga-mode-shop .coins-entry .block.green { padding-left: 10px; padding-right: 10px; color: #ffffff; background-color: #5fcb00; border: none; }";
          cm += ".raga-mode-shop .coins-entry .orange, .raga-mode-shop .coins-entry .light { padding: 15px 0; display: inline-block; border-radius: 5px; }";
          cm += ".raga-mode-shop .coins-entry .orange { width: 120px; color: #ffffff; background-color: #ff8301; }";
          cm += ".raga-mode-shop .coins-entry .light { width: 135px; background-color: #fff7b7; }";
          cm += ".raga-mode-shop .coins-entry .orange-text { color: #ff8301; }";
          cm += ".raga-mode-shop .minions-stop { height: 60px; line-height: 60px; margin-bottom: 10px; text-align: center; font-weight: bold; font-size: 18px; color: #a4a4a4; background-color: #f0f0f0; border-radius: 10px; }";
          cm += ".raga-mode-shop .minions { display: flex; flex-wrap: wrap; justify-content: start; }";
          cm += ".raga-mode-shop .minions .btn-one, .raga-mode-shop .minions .btn-one:hover { color: #ffffff; background-color: #56c0e1 !important; border-color: #4295ae; }";
          cm += ".raga-mode-shop .minions .btn-one-selected, .raga-mode-shop .minions .btn-one-selected:hover, .raga-mode-shop .minions .btn-one-selected:focus { color: #4295ae; background-color: #ffffff; border-color: #4295ae; }";
          cm += ".raga-mode-shop .minions .btn-two, .raga-mode-shop .minions .btn-two:hover { color: #ffffff; background-color: #ff5fa7 !important; border-color: #d14c88; }";
          cm += ".raga-mode-shop .minions .btn-two-selected, .raga-mode-shop .minions .btn-two-selected:hover, .raga-mode-shop .minions .btn-two-selected:focus { color: #d14c88; background-color: #ffffff; border-color: #d14c88; }";
          cm += ".raga-mode-shop .minions .minions-entry:not(:last-child) { margin-right: 10px; }";
          cm += ".raga-mode-shop .minions .minions-entry { margin-bottom: 10px; }";
          cm += ".raga-mode-shop .minions .minions-entry .block { width: 195px; padding-bottom: 25px; background-color: #f5f5f5; border-radius: 10px; }";
          cm += ".raga-mode-shop .minions .minions-entry .block .title { padding: 15px; text-align: center; font-weight: bold; color: #ffffff; background-color: #56c0e1; clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%); border-top-left-radius: 10px; border-top-right-radius: 10px; }";
          cm += ".raga-mode-shop .minions .minions-entry .block .time { margin-top: 20px; text-align: center; font-weight: bold; font-size: 18px; color: #a4a4a4; }";
          cm += ".raga-mode-shop .minions .minions-entry .block .time .clock-grey { transform: matrix(0.8, 0, 0, 0.8, -5, 4); opacity: 0.7; }";
          cm += ".raga-mode-shop .minions .minions-entry .block .hr { width: 70%; height: 20px; margin: 0 auto; border-bottom: 2px solid #a4a4a4; }";
          cm += ".raga-mode-shop .minions .minions-entry .block .mass-selector { margin-top: 20px; }";
          cm += ".raga-mode-shop .minions .minions-entry .block .mass-selector>div { margin: 2px 0; cursor: pointer; }";
          cm += ".raga-mode-shop .minions .minions-entry .block .mass-selector>div>div { width: 14px; height: 14px; margin: 0 10px; display: inline-block; border: 2px solid #a4a4a4; border-radius: 100%; }";
          cm += ".raga-mode-shop .minions .minions-entry .block .mass-selector>div.selected>div { background-color: #73deff; border-color: #73deff; }";
          cm += ".raga-mode-shop .minions .minions-entry .block .mass-selector>div>span { vertical-align: 3px; font-weight: bold; color: #a4a4a4; }";
          cm += ".raga-mode-shop .minions .minions-entry .buy { width: 195px; height: 40px; line-height: 40px; margin-top: 5px; text-align: center; font-weight: bold; color: #ffffff; background-color: #54c800; border-radius: 5px; cursor: pointer; }";
          cm += ".raga-mode-shop .minions .minions-entry .buy:hover { background-color: #347f01; }";
          cm += ".raga-mode-shop .minions .friends { width: 100%; height: 370px; text-align: center; background-color: #f5f5f5; border-radius: 10px; }";
          cm += ".raga-mode-shop .minions .friends .title { padding: 15px; font-weight: bold; color: #ffffff; background-color: #56c0e1; clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%); border-top-left-radius: 10px; border-top-right-radius: 10px; }";
          cm += ".raga-mode-shop .minions .friends .block { width: 590px; margin: 10px auto 0 auto; display: flex; flex-wrap: wrap; justify-content: space-around; }";
          cm += ".raga-mode-shop .minions .friends .block .friend { width: 250px; height: 50px; margin-top: 18px; padding: 0 10px; text-align: center; font-weight: normal; color: #adadad; border: 1px solid #adadad; border-radius: 10px; outline: none; }";
          cm += ".raga-mode-shop .minions .friends .block .friend.taken { color: #56c0e1; border-color: #56c0e1; }";
          cm += ".raga-mode-shop .minions .friends .block .friend::placeholder { color: #adadad; }";
          cm += ".raga-mode-shop .minions .friends .block .friend.taken::placeholder { color: #56c0e1; }";
          cm += ".raga-mode-shop .minions .friends .save { width: 270px; height: 40px; line-height: 40px; margin: 18px auto 0 auto; font-weight: bold; color: #ffffff; background-color: #54c800; border-radius: 5px; cursor: pointer; }";
          cm += ".raga-mode-shop .minions .friends .save:hover { background-color: #347f01; }";
          cm += ".raga-mode-shop .minions .no-friends { width: 100%; padding: 15px; text-align: center; font-weight: bold; color: #ffffff; background-color: #56c0e1; border-radius: 10px; }";
          cm += ".raga-mode-shop .minions .cancel-friendship { width: 100%; height: 225px; text-align: center; background-color: #f5f5f5; border-radius: 10px; }";
          cm += ".raga-mode-shop .minions .cancel-friendship .title { padding: 15px; font-weight: bold; color: #ffffff; background-color: #56c0e1; clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%); border-top-left-radius: 10px; border-top-right-radius: 10px; }";
          cm += ".raga-mode-shop .minions .cancel-friendship .block { width: 590px; margin: 10px auto 0 auto; display: flex; flex-wrap: wrap; justify-content: space-around; }";
          cm += ".raga-mode-shop .minions .cancel-friendship .block .friendship { width: 270px; height: 50px; line-height: 50px; margin-top: 20px; color: #adadad; background-color: #ffffff; border-radius: 10px; user-select: all; }";
          cm += ".raga-mode-shop .minions .cancel-friendship .cancel { width: 270px; height: 40px; line-height: 40px; margin: 20px auto 0 auto; font-weight: bold; color: #ffffff; background-color: #ffb84d; border-radius: 5px; cursor: pointer; }";
          cm += ".raga-mode-shop .minions .cancel-friendship .cancel:hover { background-color: #c58f3c; }";
          cm += ".raga-mode-shop .minions .refund-container { width: 100%; text-align: center; }";
          cm += ".raga-mode-shop .minions .refund { margin-top: 18px; color: #a4a4a4; }";
          cm += ".raga-mode-shop .minions .refund>span { font-weight: bold; color: #ffa539; cursor: pointer; }";
          cm += ".raga-mode-shop .create-skin { text-align: center; }";
          cm += ".raga-mode-shop .create-skin .instruction { height: 60px; line-height: 60px; margin-bottom: 10px; font-weight: bold; font-size: 18px; color: #a4a4a4; background-color: #f0f0f0; border-radius: 10px; }";
          cm += ".raga-mode-shop .create-skin .border { margin-top: 20px; display: none; }";
          cm += ".raga-mode-shop .create-skin .border>div { width: 40px; height: 40px; margin: 0 10px; display: inline-block; border-radius: 100%; cursor: pointer; }";
          cm += ".raga-mode-shop .create-skin .border>div.selected { margin: 0 5px; border: 5px solid #69dd00; }";
          cm += ".raga-mode-shop .create-skin .border>div>span { width: 30px; height: 30px; margin: 5px; display: inline-block; border-radius: 100%; }";
          cm += ".raga-mode-shop .create-skin .border .green { background-color: #69dd00; }";
          cm += ".raga-mode-shop .create-skin .border .yellow { background-color: #ffcc00; }";
          cm += ".raga-mode-shop .create-skin .border .orange { background-color: #ff7e00; }";
          cm += ".raga-mode-shop .create-skin .border .red { background-color: #ff3d3d; }";
          cm += ".raga-mode-shop .create-skin .border .violet { background-color: #c000ff; }";
          cm += ".raga-mode-shop .create-skin .border .pink { background-color: #ff3ed4; }";
          cm += ".raga-mode-shop .create-skin .border .blue { background-color: #0078ff; }";
          cm += ".raga-mode-shop .create-skin .border .light-blue { background-color: #00deff; }";
          cm += ".raga-mode-shop .create-skin .border .white { background-color: #c3c3c3; }";
          cm += ".raga-mode-shop .create-skin .border .black { background-color: #2a2a2a; }";
          cm += ".raga-mode-shop .create-skin canvas { margin: 5px auto 10px auto; display: none; }";
          cm += ".raga-mode-shop .create-skin .select-image { width: 195px; height: 40px; line-height: 40px; margin-bottom: 10px; display: inline-block; text-align: center; font-weight: bold; color: #ffffff; background-color: #00d3ff; border-radius: 5px; cursor: pointer; }";
          cm += ".raga-mode-shop .create-skin .select-image:hover { background-color: #3f89b6; }";
          cm += ".raga-mode-shop .create-skin #select-image-upload { display: none; }";
          cm += ".raga-mode-shop .create-skin .serror, .raga-mode-shop .create-skin .save { display: none; }";
          cm += ".raga-mode-shop .create-skin .serror { color: red; }";
          cm += ".raga-mode-shop .create-skin .save { width: 195px; height: 40px; line-height: 40px; margin: 0 auto; text-align: center; font-weight: bold; color: #ffffff; background-color: #54c800; border-radius: 5px; cursor: pointer; }";
          cm += ".raga-mode-shop .create-skin .save:hover { background-color: #347f01; }";
          cm += ".raga-mode-shop .create-skin .loader { width: 120px; height: 120px; margin: 100px auto 0 auto; border: 16px solid #f0f0f0; border-top: 16px solid #00d3ff; border-bottom: 16px solid #00d3ff; border-radius: 50%; animation: spin 3s linear infinite; }";
          cm += "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";
          cm += ".raga-mode-shop .create-skin .done { margin: 100px auto 0 auto; }";
          cm += ".raga-mode-settings { height: 515px; margin-top: 25px; padding-right: 10px; display: flex; flex-wrap: wrap; justify-content: space-between; overflow-y: scroll; }";
          cm += ".raga-mode-settings .settings-entry { margin-bottom: 25px; }";
          cm += ".raga-mode-settings .settings-entry.general { width: 100%; display: flex; flex-wrap: wrap; justify-content: space-between; }";
          cm += ".raga-mode-settings .settings-entry .section { width: 100%; margin-bottom: 10px; padding-bottom: 10px; font-weight: bold; font-size: 21px; color: #656465; border-bottom: 2px solid #c6c7c6; }";
          cm += ".raga-mode-settings .settings-entry .command { width: 378px; margin-bottom: 10px; display: flex; justify-content: space-between; }";
          cm += ".raga-mode-settings .settings-entry .command .name { width: 227px; padding: 14px; background-color: #f4f5f4; border: 1px solid #f4f5f4; border-radius: 5px; }";
          cm += ".raga-mode-settings .settings-entry .command .select { width: 115px; height: 100%; text-align: center; color: #ffffff; background-color: #00c1f1; border: 1px solid #00c1f1; border-radius: 5px; outline: none; }";
          cm += ".raga-mode-settings .settings-entry .command .value { position: relative; width: 87px; padding: 14px; text-align: center; color: #ffffff; background-color: #00c1f1; border: 1px solid #00c1f1; border-radius: 5px; cursor: pointer; }";
          cm += ".raga-mode-settings .settings-entry .command .value.conflict { background-color: #ff6767; border-color: #ff6767; }";
          cm += ".raga-mode-settings .settings-entry .command .value:after { position: absolute; left: 0; width: 100%; opacity: 0; content: attr(data-active); }";
          cm += ".raga-mode-settings .settings-entry .command .value:hover { background-color: #0293b7; border-color: #0293b7; }";
          cm += ".raga-mode-settings .settings-entry .command .value.conflict:hover { background-color: #d85858; border-color: #d85858; }";
          cm += ".raga-mode-settings .settings-entry .command .value.active { color: #0293b7; background-color: inherit; border-color: #00c1f1; }";
          cm += ".raga-mode-settings .settings-entry .command .value.active.conflict { color: #e06464; background-color: inherit; border-color: #ff6767; }";
          cm += ".raga-mode-settings .settings-entry .command .value.active span { opacity: 0; }";
          cm += ".raga-mode-settings .settings-entry .command .value.active:after { opacity: 1; }";
          cm += ".raga-mode-skin-selector { width: 100%; height: 450px; margin: 30px -2.5px 0 -2.5px; display: flex; flex-wrap: wrap; overflow-y: scroll; }";
          cm += ".raga-mode-skin-selector .skin-entry { position: relative; width: 146px; height: 146px; margin: 0 2.5px 5px 2.5px; background-position: center; border-radius: 100%; cursor: pointer; }";
          cm += ".raga-mode-skin-selector .skin-entry .overlay-container { position: absolute; top: 0; width: 100%; height: 100%; }";
          cm += ".raga-mode-skin-selector .skin-entry .overlay-container .remove { position: absolute; top: -5px; left: -5px; width: 24px; height: 24px; display: none; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LmRhNGE3ZTVlZiwgMjAyMi8xMS8yMi0xMzo1MDowNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjEgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjZBNjhDODdBMTUwMTFFREE5Q0RENTU5MDRFMThDMkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjZBNjhDODhBMTUwMTFFREE5Q0RENTU5MDRFMThDMkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2NkE2OEM4NUExNTAxMUVEQTlDREQ1NTkwNEUxOEMyRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NkE2OEM4NkExNTAxMUVEQTlDREQ1NTkwNEUxOEMyRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnFSC+IAAALBSURBVHjatFVLbxJRFP7uiDEEYt0BkxgehUCJiaHdGOtC7bLFhVbSaMHELtx0pf4LF2603da2Wu0/qAuwsFGTVrswxJQKDZYBF7YVsEDIjOdSQIcO9GF7FjN3Zs585/0dpigKTlJ0/MIY66iUzWYvyDK7SEdT/VWOMfmzxWL50uk/7jyrXTQMpNNpvU6nG6evD+ixuw3GGgObLJV+P7fb7aUDG9jI5S4zWXlNx/MHzMS6wDBiNpvftxoQWjUlSQoQePgQ4FyssoII/Tvc+kEVQd1zDn7miDUtUSTXGpGoUsRzfkp3+ushPdeSVLGQ97hcrrIqRbygxwDOxWY0nh3fk6KMlF2jZ0er9sTkJAqFIoZv3YTD4UC1WkUk8g7RWAxOZzfuhUJ7LFDCExaL2dWMgPe5FjiXzZ+biMfjmJmdRSKRwGI0ijfz88hkMtje/tXsFlX3AE4quLcZgST9uEunWS0D35JJTE/P8BrBYDDUIpBlGVf6+zHkH8K5ri7tIWO4I5pMc8LuJMPSLqEOux2hUBBGoxH5fB47Ozvwer0IBG63BeciKEys3f9GpS3c4/VUCpVKpflua2sL3zc20JkmdjGF3XAUqZ1iOBzGy1dzKJfL6OvtrUWUpLRNTb3A0vJyewOCkmkaoEKsaPEIl8XFKARBwMDAdYyN3UcwOAqr1VqrycLC27YGmCyvNA3UWFHBqkqhPt1ujwc+nw+Dg4PQ6/Ww2Wy44ffD43HD43Zrg1ObiqIYV82BJOUeU9qeHMsSUPBQFM1PVZNMlPuMs+IxwCeLxfyEJtnR8PSBCTE66v+D7K4S2X3QpGvK2xKDwme/dBRwasfRBrhmBP+syEvE73OcuA6aFnJshJrl474Lhwvnc0655NEj3hEdirnKC0q6Pa3gHSNoFapNDw2DD3J96QvIESF9arTivkv/JOWPAAMAPmlOZo5ILosAAAAASUVORK5CYII='); }";
          cm += ".raga-mode-skin-selector .skin-entry .overlay-container .copy { position: absolute; top: -5px; right: -5px; width: 24px; height: 24px; display: none; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALqSURBVEiJxZXNb0xRGMZ/73VFq2LZuXeidFCUJqJdqPoIsShqiZT4SEgQqhKknZg1ipWiYhIbIvwBFBsW1SrJFInS+shg4t6ZknTRjozNPRYzvabTmelUIp7dPee9v+c8555zX/jHkkKKotFolePIcsCTGoqJOK9M0+z/a4NIJFKs63qTQg4BC3KUfRLkWiLx86rP50sUbPAtFqsTR90FyiZbYUpfNKHRMIzezAktc8C27R3iqMdTgAPMcxRPbNveljkxLkFq5Y+BGVOApyuhCRvSk7gGkUikeJo+fZCprTybPsdHR5ZUVFT8grQt0nW9qRB4T9dTdm3fwcZ16wi0+hkeHs4sKZ81a3bT2INroJDDk8EfdnZy2t9Kuc/HoaNHeNv/hovn2rJUKpelQ+qcK+bng0ciX2k7c4bNWxs41nycmSUlAAQ7rqGUQuTP51Sw0LbtpaZpvtUAUpcoL7y01MPZCxfweAwa6uv5GY/zMtRHaalnHHxMjiSZGoAIZi74w85O9jTupC8U4v3gIDeCQfbt38/l9ks86+6mqbk563uaEq9rkEw1UT1dT91tGRwY4EYwyIGDB1m0eDEP7t3HHwhQt3ZNVgOlkkwdQImys1lcaW+nbvUajjUfp6G+3oVX19Rw6+4dysrm5gqO0pTlJhClXk9cgWJoKMaK6mpmlpRw/9EjYrEop1ta+DH0PS8cQBzntZvANM1+y4p+QKhwC0RYWbuK27duokTRFwrR292DPxBgztz810Xgo+n1vnMTpIDBzMJT/laWLqvi+tUOvoa/cLbtPJu2bMkLT6anI80sqXA4XDSjqHgAmDcpIb/C8dGRyrFfxbgDbFlWDaJ1AcV/CU9ownrDMJ6PDYz7XXu93pCg9gJZm8dkcJTsTodDjoYTjUZrHcUdoLxAeFhQjaZpvsicmNBwAAzD6I2PjixByUmBjzmxig8oTsRHRyqzwaHApm9ZViWatgIn1fQ1YjjOS2/qKP5X/Qb1xA/8B4+wcgAAAABJRU5ErkJggg=='); }";
          cm += ".raga-mode-skin-selector .skin-entry .overlay-container:hover .remove, .raga-mode-skin-selector .skin-entry .overlay-container:hover .copy { display: block; }";
          cm += ".raga-mode-skin-selector .skin-entry.pending { opacity: 0.8; }";
          cm += ".raga-mode-skin-selector .skin-entry.pending>.sprite-common.rush_icon { transform: matrix(0.6, 0, 0, 0.6, 25, 15); }";
          cm += ".raga-mode-skin-selector .skin-entry.selected { opacity: 0.2; }";
          const cp = document.createElement("style");
          cp.innerHTML = cm;
          document.head.appendChild(cp);
        }
        hookListeners() {
          addEventListener("hashchange", cr => {
            if (!document.getElementById("mainui-modes")) {
              return;
            }
            let ct;
            if (!cr.newURL) {
              ct = location.hash;
            } else {
              ct = cr.newURL.substr(cr.newURL.indexOf("#"));
            }
            if (ct && (ct === "#ffa" || ct === "#battleroyale" || ct === "#teams" || ct === "#experimental")) {
              const cu = ct.substr(1);
              document.querySelectorAll(".ffa")[1].className = "item ffa";
              document.querySelectorAll(".battleroyale")[1].className = "item battleroyale";
              document.querySelectorAll(".teams")[1].className = "item teams";
              document.querySelectorAll(".experimental")[1].className = "item experimental";
              this.gameModes.forEach(cv => {
                document.querySelector("." + cv.type).className = "item " + cv.type;
              });
              if (cu === "teams" && this.isIgnoringTeams) {
                this.isIgnoringTeams = false;
              } else if (!this.pendingGameMode) {
                if (this.isUiRefreshed && this.gameModes.find(cx => cx.type === this.gameMode)) {
                  document.querySelector("." + this.gameMode).className = "item active " + this.gameMode;
                } else {
                  document.querySelectorAll("." + cu)[1].className = "item active " + cu;
                  this.gameMode = cu;
                }
              } else {
                this.gameMode = cu;
              }
              this.isUiRefreshed = false;
            }
          }, false);
          addEventListener("joinparty", () => {
            document.querySelectorAll(".ffa")[1].className = "item active ffa";
            document.querySelectorAll(".battleroyale")[1].className = "item active battleroyale";
            document.querySelectorAll(".teams")[1].className = "item active teams";
            document.querySelectorAll(".experimental")[1].className = "item active experimental";
            this.gameModes.forEach(cz => {
              document.querySelector("." + cz.type).className = "item active " + cz.type;
            });
            this.gameMode = "party";
          });
          addEventListener("login", () => {
            const dc = window.MiniclipAPI.prototype.getUserInfo();
            this.profileImage = dc.avatarUrl;
            this.profileName = dc.userInfo.name;
            this.updateInterface();
          });
          addEventListener("logout", () => {
            this.isLogged = false;
            this.profileImage = null;
            this.profileName = null;
            this.ident = null;
            this.money = null;
            this.skin = null;
            this.minions = null;
            this.friends = [];
            this.ownedSkins = [];
            this.tournamentMode = null;
            this.tournament = {};
            this.survivorCoins = null;
            this.serverFatMinions = null;
            clearInterval(this.listenLoop);
            this.updateInterface();
          });
          window.addKeyListeners = () => {};
          addEventListener("keydown", de => {
            if (this.changingSettings) {
              de.preventDefault();
              if (de.key.toLowerCase() === "escape" || de.key.toLowerCase() === this.changingSettings.entry.value) {
                this.changingSettings.element.classList.toggle("active");
                this.changingSettings = null;
                return;
              }
              const dg = this.changingSettings.entry.ident + ":" + de.key.toLowerCase();
              const dh = new Uint8Array([36, ...unescape(encodeURIComponent(dg)).split("").map(di => di.charCodeAt(0)), 0]);
              window.core.proxyMobileData(dh);
              window.core.proxyMobileData(new Uint8Array([9]));
              this.changingSettings.element.classList.toggle("active");
              this.changingSettings = null;
              return;
            }
            if (document.getElementById("overlays")) {
              return;
            }
            if (de.key.toLowerCase() === "escape") {
              de.preventDefault();
              document.dispatchEvent(new Event("show_main_menu"));
            } else if (de.key.toLowerCase() === "q" && !window.core.playerHasCells()) {
              de.preventDefault();
              window.core.specialOn();
            } else {
              const dj = this.settings.find(dk => typeof dk.command === "function" && dk.value === de.key.toLowerCase());
              if (dj && (!dj.toggle || !de.repeat)) {
                de.preventDefault();
                dj.command();
              }
            }
          });
          addEventListener("keyup", dl => {
            const dn = this.settings.find(dp => typeof dp.command === "function" && dp.value === dl.key.toLowerCase() && dp.toggle);
            if (dn) {
              dl.preventDefault();
              dn.command(true);
            }
          });
        }
        startObserver() {
          const dr = ["agar-io_160x600", "agar-io_300x600", "agar-io_728x90", "agar-io_160x600_2", "agar-io_300x600_2"];
          const ds = new WebKitMutationObserver(dt => {
            dt.forEach(dv => {
              dv.addedNodes.forEach(dx => {
                if (!this.isClean) {
                  let dz = [...document.querySelectorAll(dr.map(ea => "#" + ea).join(","))];
                  dz.forEach(eb => {
                    eb.setAttribute = ed => {
                      if (ed === "data-google-query-id") {
                        eb.remove();
                      }
                    };
                  });
                  document.getElementById("preroll").remove();
                  this.isClean = true;
                } else if (dr.includes(dx.id)) {
                  dx.setAttribute = ef => {
                    if (ef === "data-google-query-id") {
                      dx.remove();
                    }
                  };
                }
                if (dx.classList && dx.classList.contains("adsbygoogle")) {
                  dx.remove();
                  [...document.getElementsByClassName("adsbygoogle")].forEach(eh => {
                    eh.remove();
                  });
                } else if (dx.id === "overlays") {
                  const ej = document.getElementById("skinButton");
                  let ek = document.getElementById("new-skinButton");
                  if (!ek) {
                    ek = ej.cloneNode(true);
                    ek.id = "new-skinButton";
                    ek.onclick = () => this.openSkinSelectorInterface(0);
                    ek.style.display = "none";
                    ej.after(ek);
                  }
                } else if (dx.id === "mainui-user") {
                  this.switchInterface();
                } else if (dx.id === "mainui-modes") {
                  const el = document.querySelector(".ffa");
                  const em = el.cloneNode(true);
                  em.onclick = () => this.changeGameMode("ffa");
                  el.style.display = "none";
                  el.parentNode.appendChild(em);
                  const en = document.querySelector(".battleroyale");
                  const eo = en.cloneNode(true);
                  eo.onclick = () => this.changeGameMode("battleroyale");
                  en.style.display = "none";
                  en.parentNode.appendChild(eo);
                  const ep = document.querySelector(".teams");
                  const eq = ep.cloneNode(true);
                  eq.onclick = () => this.changeGameMode("teams");
                  ep.style.display = "none";
                  ep.parentNode.appendChild(eq);
                  const er = document.querySelector(".experimental");
                  const es = er.cloneNode(true);
                  es.onclick = () => this.changeGameMode("experimental");
                  er.style.display = "none";
                  er.parentNode.appendChild(es);
                  let et = 237;
                  this.gameModes.forEach(eu => {
                    const ew = er.cloneNode(true);
                    ew.style.display = "flex";
                    if (eu.type.indexOf("tourney") !== -1) {
                      ew.style.flexBasis = "100%";
                      ew.style.display = "none";
                      if (eu.type === this.tournamentMode) {
                        ew.style.display = "flex";
                        et += 67;
                      }
                    }
                    ew.className = "item " + eu.type;
                    ew.onclick = () => this.changeGameMode(eu.type);
                    ew.children[0].innerHTML = eu.fullName;
                    er.parentNode.appendChild(ew);
                  });
                  dispatchEvent(new Event("hashchange"));
                  if (document.querySelector(".partymode-info")) {
                    dispatchEvent(new Event("joinparty"));
                  }
                  dx.style.height = et + "px";
                } else if (dx.className === "partymode-info") {
                  if (document.getElementById("mainui-modes")) {
                    dispatchEvent(new Event("joinparty"));
                  }
                } else if (dx.className === "party-dialog") {
                  const ex = document.querySelector(".party-dialog .party-join");
                  ex.onclick = () => this.startLoader();
                  const ey = document.querySelectorAll(".party-dialog .Close, .party-dialog .party-cancel");
                  ey.forEach(ez => {
                    ez.onclick = () => {
                      this.pendingGameMode = null;
                    };
                  });
                }
              });
              dv.removedNodes.forEach(fa => {
                if (fa.id === "mainui-modes") {
                  this.isUiRefreshed = true;
                }
              });
            });
          });
          ds.observe(document, {
            childList: true,
            subtree: true
          });
        }
        onRegisterSkin(fc, fd, fe, ff, fg) {
          if (!fc && fd && fd.substr(0, 1) === "%" && fd.indexOf("%rm_") === -1 && fd.indexOf("%custom_") === -1 && fe !== "uses_spine") {
            this.agarioSkins.unshift({
              ident: fd.substr(1),
              url: fe,
              color: fg
            });
          }
        }
        onConnect() {
          if (!this.isSetup) {
            this.skins.forEach(fj => {
              if (fj.color >= 0) {
                window.core.registerSkin(null, "%" + fj.ident, "" + fj.url, "2", fj.color);
              } else {
                window.core.registerSkin(null, "%" + fj.ident, "" + fj.url);
              }
            });
            window.core.setMinimap(true);
            window.core.playersMinimap(true);
            this.isSetup = true;
          }
          this.isAuthSent = false;
          if (this.gameModes.find(fl => fl.type === this.gameMode)) {
            const fm = window.MiniclipAPI.prototype.getHost();
            const fn = new Uint8Array([1, ...unescape(encodeURIComponent(fm)).split("").map(fo => fo.charCodeAt(0)), 0]);
            window.core.proxyMobileData(fn);
          } else if (this.pendingGameMode) {
            setTimeout(() => {
              this.changeGameMode(this.pendingGameMode, false);
              this.pendingGameMode = null;
            }, 1000);
          }
          this.loadSkin(null);
          this.isPlayerStopped = false;
          this.tournament = {};
          this.serverFatMinions = null;
          this.switchInterface();
        }
        onPacket(fp) {
          const fr = new Uint8Array(Array.from(fp)).buffer;
          const fs = new DataView(fr);
          let ft = 0;
          const fu = fs.getUint8(ft);
          ft += 1;
          if (fu === 8 || fu === 9) {
            if (this.gameModes.find(fv => fv.type === this.gameMode)) {
              this.ident = "";
              while (fs.getUint8(ft)) {
                this.ident += String.fromCharCode(fs.getUint8(ft++));
              }
              this.ident = decodeURIComponent(escape(this.ident));
              ft += 1;
              this.money = fs.getUint32(ft, true);
              ft += 4;
              this.skin = "";
              while (fs.getUint8(ft)) {
                this.skin += String.fromCharCode(fs.getUint8(ft++));
              }
              this.skin = decodeURIComponent(escape(this.skin));
              ft += 1;
              let fw = "";
              while (fs.getUint8(ft)) {
                fw += String.fromCharCode(fs.getUint8(ft++));
              }
              fw = decodeURIComponent(escape(fw));
              ft += 1;
              const fx = fs.getUint8(ft);
              ft += 1;
              const fy = fs.getUint16(ft, true);
              ft += 2;
              const fz = fs.getUint16(ft, true);
              ft += 2;
              const ga = fs.getUint16(ft, true);
              ft += 2;
              const gb = fs.getUint32(ft, true);
              this.minions = {
                loaded: fy,
                owner: fw,
                state: fx,
                amount: fy,
                fatAmount: fz,
                fatMass: ga,
                expireTime: Date.now() + gb * 1000,
                time: () => Math.max(Math.ceil((this.minions.expireTime - Date.now()) / 1000), 0),
                refundStart: 0,
                refundEnd: 0
              };
              ft += 4;
              const gc = fs.getUint16(ft, true);
              ft += 2;
              this.friends = [];
              for (let gd = 0; gd < gc; gd++) {
                let ge = "";
                while (fs.getUint8(ft)) {
                  ge += String.fromCharCode(fs.getUint8(ft++));
                }
                ge = decodeURIComponent(escape(ge));
                this.friends.push(ge);
                ft += 1;
              }
              const gf = fs.getUint16(ft, true);
              ft += 2;
              this.ownedSkins = [];
              for (let gg = 0; gg < gf; gg++) {
                let gh = "";
                while (fs.getUint8(ft)) {
                  gh += String.fromCharCode(fs.getUint8(ft++));
                }
                gh = decodeURIComponent(escape(gh));
                this.ownedSkins.push(gh);
                ft += 1;
              }
              this.isLogged = true;
              this.isAuthSent = true;
              window.core.proxyMobileData(new Uint8Array([!!window[this.defaultProfile] + 48]));
              this.loadSkin(this.skin);
              clearInterval(this.listenLoop);
              if (this.minions.time() > 0) {
                this.listenLoop = setInterval(() => {
                  if (this.minions.time() <= 0) {
                    clearInterval(this.listenLoop);
                    window.core.proxyMobileData(new Uint8Array([9]));
                  }
                  this.updateInterface(true);
                }, 1000);
              }
              const gj = fs.getUint16(ft, true);
              ft += 2;
              for (let gk = 0; gk < gj; gk++) {
                let gl = "";
                while (fs.getUint8(ft)) {
                  gl += String.fromCharCode(fs.getUint8(ft++));
                }
                gl = decodeURIComponent(escape(gl));
                const gm = gl.split(":");
                const gn = this.settings.find(go => go.ident === gm[0]);
                if (gn) {
                  const gp = JSON.parse(JSON.stringify(gn));
                  gn.value = gm[1];
                  if (gn.ident === "connection") {
                    localStorage.setItem(gn.ident, JSON.stringify(gn));
                    if (gn.value !== gp.value) {
                      this.changeGameMode("ffa", false);
                    }
                  }
                }
                ft += 1;
              }
              this.tournamentMode = "";
              while (fs.getUint8(ft)) {
                this.tournamentMode += String.fromCharCode(fs.getUint8(ft++));
              }
              this.tournamentMode = decodeURIComponent(escape(this.tournamentMode));
              ft += 1;
              const gq = fs.getUint32(ft, true);
              ft += 4;
              const gr = fs.getUint32(ft, true);
              this.minions.refundStart = gq;
              this.minions.refundEnd = gr;
              ft += 4;
              this.serverFatMinions = !!fs.getUint8(ft);
              this.updateInterface();
              return null;
            }
            this.ident = null;
            this.money = null;
            this.skin = null;
            this.minions = {
              loaded: 0,
              owner: "",
              state: 0,
              amount: 0,
              fatAmount: 0,
              fatMass: 0,
              expireTime: 0,
              time: () => 0,
              refundStart: 0,
              refundEnd: 0
            };
            this.friends = [];
            this.ownedSkins = [];
            this.tournamentMode = null;
            this.tournament = {};
            this.survivorCoins = null;
            this.serverFatMinions = null;
            this.isLogged = true;
            clearInterval(this.listenLoop);
            this.updateInterface();
          } else if (fu === 10) {
            if (this.gameModes.find(gs => gs.type === this.gameMode)) {
              location.reload();
              return null;
            }
          } else if (fu === 11) {
            if (this.gameModes.find(gt => gt.type === this.gameMode)) {
              return new Uint8Array([8, 1, 18, 7, 8, 20, 162, 1, 2, 8, 3]);
            }
          } else if (fu === 14) {
            this.tournament.time = fs.getUint32(ft, true);
            ft += 4;
            this.tournament.message = "";
            while (fs.getUint8(ft)) {
              this.tournament.message += String.fromCharCode(fs.getUint8(ft++));
            }
            this.tournament.message = decodeURIComponent(escape(this.tournament.message));
            ft += 1;
            this.tournament.alive = fs.getUint32(ft, true);
            ft += 4;
            this.tournament.dead = fs.getUint32(ft, true);
            return null;
          } else if (fu === 12) {
            this.tournament.time = fs.getUint32(ft, true);
            ft += 4;
            this.tournament.message = "";
            while (fs.getUint8(ft)) {
              this.tournament.message += String.fromCharCode(fs.getUint8(ft++));
            }
            this.tournament.message = decodeURIComponent(escape(this.tournament.message));
            ft += 1;
            this.tournament.team1Tag = "";
            while (fs.getUint8(ft)) {
              this.tournament.team1Tag += String.fromCharCode(fs.getUint8(ft++));
            }
            this.tournament.team1Tag = decodeURIComponent(escape(this.tournament.team1Tag));
            ft += 1;
            this.tournament.team1Score = Math.round(fs.getFloat32(ft, true));
            ft += 4;
            this.tournament.team1Color = fs.getUint8(ft);
            ft += 1;
            this.tournament.team2Tag = "";
            while (fs.getUint8(ft)) {
              this.tournament.team2Tag += String.fromCharCode(fs.getUint8(ft++));
            }
            this.tournament.team2Tag = decodeURIComponent(escape(this.tournament.team2Tag));
            ft += 1;
            this.tournament.team2Score = Math.round(fs.getFloat32(ft, true));
            ft += 4;
            this.tournament.team2Color = fs.getUint8(ft);
            return null;
          } else if (fu === 13) {
            this.survivorCoins = fs.getInt32(ft, true);
            return null;
          } else if (fu === 15) {
            const gu = window.MiniclipAPI.prototype.getUserId();
            const gv = new Uint8Array([2, ...unescape(encodeURIComponent(gu)).split("").map(gw => gw.charCodeAt(0)), 0]);
            window.core.proxyMobileData(gv);
            return null;
          }
          return fp;
        }
        onMouseX(gx) {
          if (this.isPlayerStopped) {
            return window.innerWidth / 2;
          }
          return gx;
        }
        onMouseY(gz) {
          if (this.isPlayerStopped) {
            return window.innerHeight / 2;
          }
          return gz;
        }
        onPlayerZoom(hb) {
          const hd = document.getElementById("overlays");
          if (hd) {
            return 0;
          } else {
            return hb;
          }
        }
        onDisconnect(he) {
          if (this.gameModes.find(hg => hg.type === this.gameMode) && he.url.indexOf("agar.io") === -1 && this.isSwitchingGameMode === false) {
            if (document.getElementById("mainui-modes")) {
              this.changeGameMode("ffa", false);
            } else {
              window.MiniclipAPI.prototype.reconnect();
              this.gameMode = "ffa";
            }
          } else if (this.isSwitchingGameMode === true) {
            this.isSwitchingGameMode = false;
          }
        }
        loadSkin(hh) {
          let hj;
          if (document.getElementById("skinButton").style.display === "") {
            hj = "skinButton";
          } else {
            hj = "new-skinButton";
          }
          if (hh) {
            window.core.loadSkin("%" + hh);
            const {
              skinOpts: hk
            } = this.getInterface();
            const hl = document.querySelector("#" + hj + " .skinWrapper img");
            hl.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
            hl.style.width = "50px";
            hl.style.height = "50px";
            hl.style.display = "block";
            hl.style.backgroundSize = "50px";
            hl.style.backgroundImage = "url('" + hk.url + "')";
            hl.style.opacity = "1";
            const hm = document.querySelector("#" + hj + " .skinWrapper");
            hm.style.border = "3px solid " + hk.color;
            const hn = document.querySelector("#" + hj + " #skinLabel");
            hn.style.display = "none";
            hn.style.opacity = "1";
          } else {
            window.core.loadSkin("%empty");
            const ho = document.querySelector("#" + hj + " .skinWrapper img");
            ho.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
            ho.style.width = "50px";
            ho.style.height = "50px";
            ho.style.display = "none";
            ho.style.backgroundSize = "50px";
            ho.style.backgroundImage = "";
            ho.style.opacity = "1";
            const hp = document.querySelector("#" + hj + " .skinWrapper");
            hp.style.border = "3px solid rgb(131, 131, 131)";
            const hq = document.querySelector("#" + hj + " #skinLabel");
            hq.style.display = "block";
            hq.style.opacity = "1";
          }
        }
        startLoader() {
          if (this.pendingGameMode) {
            document.querySelector("." + this.pendingGameMode).children[0].innerHTML = "<img width=\"50%\" src=\"img/loader.gif\" />";
          }
        }
        async changeGameMode(ht, hu = true) {
          if (document.querySelector(".partymode-info")) {
            if (this.gameModes.find(hw => hw.type === ht)) {
              this.pendingGameMode = ht;
              document.querySelectorAll(".ffa")[0].click();
            } else {
              document.querySelectorAll("." + ht)[0].click();
            }
            return;
          }
          if (this.gameModes.find(hx => hx.type === this.gameMode) && ht === "ffa") {
            this.isIgnoringTeams = true;
            document.querySelectorAll(".teams")[0].click();
            document.querySelectorAll(".ffa")[0].click();
          } else if (!this.gameModes.find(hy => hy.type === ht)) {
            document.querySelectorAll("." + ht)[0].click();
          } else if (!this.gameModes.find(hz => hz.type === this.gameMode) && this.gameMode !== "ffa") {
            this.pendingGameMode = ht;
            document.querySelectorAll(".ffa")[0].click();
            this.startLoader();
          } else if (this.gameModes.find(ia => ia.type === this.gameMode) && ht !== this.gameMode) {
            this.pendingGameMode = ht;
            document.querySelectorAll(".teams")[0].click();
            document.querySelectorAll(".ffa")[0].click();
            this.startLoader();
          } else if ((!this.pendingGameMode || !hu) && ht !== this.gameMode) {
            const ib = await fetch("https://minions.raga.pw/ragamode/findServer", {
              cache: "no-store",
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body: "gameMode=" + ht
            }).then(ic => ic.text()).then(ie => {
              if (this.settings.find(ih => ih.ident === "connection").value === "1") {
                return ie.replace("rm", "rm-cf");
              } else if (this.settings.find(ii => ii.ident === "connection").value === "2") {
                return ie.replace("rm", "rm-us");
              } else if (this.settings.find(ij => ij.ident === "connection").value === "3") {
                return ie.replace("rm", "rm-in");
              }
              return ie;
            }).catch(() => {});
            if (!ib) {
              alert("Something went wrong, please try again later");
            } else {
              document.querySelectorAll(".ffa")[1].className = "item ffa";
              document.querySelector("." + this.gameMode).className = "item " + this.gameMode;
              document.querySelector("." + ht).children[0].innerHTML = this.gameModes.find(ik => ik.type === ht).fullName;
              document.querySelector("." + ht).className = "item active " + ht;
              window.core.connect(ib);
              this.gameMode = ht;
              this.isSwitchingGameMode = true;
            }
          }
        }
        formatInterfaceTime(il) {
          if (il < 60) {
            let ip = il;
            ip += ip === 1 ? " second" : " seconds";
            return ip;
          }
          if (il < 3600) {
            let iq = Math.floor(il / 60);
            iq += iq === 1 ? " minute" : " minutes";
            return iq;
          }
          if (il < 86400) {
            let ir = Math.floor(il / 3600);
            let it = Math.floor((il - ir * 3600) / 60);
            if (it > 0) {
              ir += ir === 1 ? " hour" : " hrs";
              it += it === 1 ? " minute" : " mins";
              return ir + " " + it;
            }
            ir += ir === 1 ? " hour" : " hours";
            return ir;
          }
          if (il < 2592000) {
            let iu = Math.floor(il / 86400);
            let iv = Math.floor((il - iu * 86400) / 3600);
            if (iv > 0) {
              iu += iu === 1 ? " day" : " days";
              iv += iv === 1 ? " hour" : " hrs";
              return iu + " " + iv;
            }
            iu += iu === 1 ? " day" : " days";
            return iu;
          }
          let iw = Math.floor(il / 2592000);
          let ix = Math.floor((il - iw * 259200) / 86400);
          if (ix > 0) {
            iw += iw === 1 ? " month" : " months";
            ix += ix === 1 ? " day" : " days";
            return iw + " " + ix;
          }
          iw += iw === 1 ? " month" : " months";
          return iw;
        }
        getInterface() {
          const iz = this.profileImage ? this.profileImage : "img/profilepic_guest.png";
          const ja = this.money ? this.money : "0";
          const jb = "ID: " + (this.isLogged ? this.ident ? "<span class=\"ident\">" + this.ident + "</span>" : "Loading..." : "Sign in");
          const jc = this.profileName ? this.profileName : "Guest";
          let jd;
          let je;
          if (!this.isLogged) {
            jd = "Sign in";
            je = "Sign in";
          } else if (this.minions.amount === 0 && this.minions.fatAmount === 0) {
            jd = "Loading...";
            je = "Loading...";
          } else if (this.minions.time() <= 0) {
            jd = (this.minions.fatAmount === 0 ? this.minions.amount : this.minions.amount + " + " + this.minions.fatAmount) + " free minions";
            je = "You have " + (this.minions.fatAmount === 0 ? this.minions.amount : this.minions.amount + " + " + this.minions.fatAmount) + " free minions, rent more now";
          } else {
            jd = (this.minions.fatAmount === 0 ? this.minions.amount : this.minions.amount + " + " + this.minions.fatAmount) + " minions, " + this.formatInterfaceTime(this.minions.time()) + " left";
            je = "You have " + (this.minions.fatAmount === 0 ? this.minions.amount : this.minions.amount + " + " + this.minions.fatAmount) + " minions, rent ends in " + this.formatInterfaceTime(this.minions.time());
          }
          let jf = "";
          if (this.isLogged && this.minions.refundEnd > 0) {
            if (Date.now() > new Date(this.minions.refundStart * 1000) && Date.now() < new Date(this.minions.refundEnd * 1000)) {
              jf = "<div class=\"refund\">Click <span onclick=\"raga.refundMinionsInterface();\">here</span> to refund this rent</div>";
            } else {
              jf = "<div class=\"refund\">Contact our <span onclick=\"raga.supportMinionsInterface();\">Support Center</span> if you need any help</div>";
            }
          }
          let jg = null;
          if (this.skin) {
            if (this.skin.indexOf("rm_") !== -1) {
              const jh = this.skins.find(ji => ji.ident === this.skin);
              jg = {
                url: jh.url.replace("/normal/", "/small/"),
                color: "#" + (jh.color >= 0 ? jh.color : 16777215).toString(16).padStart(6, "0")
              };
            } else {
              const jj = this.agarioSkins.find(jk => jk.ident === this.skin);
              jg = {
                url: jj.url.replace(".png", "_low.png"),
                color: "#" + jj.color.toString(16).padStart(6, "0")
              };
            }
          }
          return {
            profileImage: iz,
            money: ja,
            ident: jb,
            profileName: jc,
            minions: jd,
            minionsShop: je,
            minionsShopRefund: jf,
            skinOpts: jg
          };
        }
        updateInterface(jl = false) {
          const jn = document.querySelector(".new-user-container");
          if (jn) {
            const jo = this.getInterface();
            const jp = document.querySelector(".new-user-container .user-picture");
            jp.src = jo.profileImage;
            const jq = document.querySelector(".new-user-container .currency-container .label");
            jq.innerHTML = jo.money;
            const jr = document.querySelector(".new-user-container .ident-container");
            if (jr.innerHTML !== jo.ident) {
              jr.innerHTML = jo.ident;
            }
            const jt = document.querySelector(".new-user-container .user-name");
            jt.innerHTML = jo.profileName;
            const ju = document.querySelector(".new-user-container .progress-bar-text");
            ju.innerHTML = jo.minions;
            const jv = document.querySelector(".leagues-dialog .currency-container .label");
            if (jv) {
              jv.innerHTML = jo.money;
            }
            const jw = document.querySelector(".raga-mode-shop .minions-stop");
            if (jw) {
              jw.innerHTML = jo.minionsShop;
            }
            const jx = document.querySelector(".raga-mode-shop .minions .refund-container");
            if (jx) {
              jx.innerHTML = jo.minionsShopRefund;
            }
            if (!jl) {
              const jy = document.querySelector(".raga-mode-shop .minions");
              if (jy) {
                this.openShopInterface(1);
              }
              let jz = document.querySelector(".raga-mode-settings");
              if (jz) {
                const {
                  scrollTop: ka
                } = jz;
                this.openSettingsInterface();
                jz = document.querySelector(".raga-mode-settings");
                jz.scrollTop = ka;
              }
            }
          }
          const kb = document.getElementById("nick");
          if (kb) {
            this.checkSpawnInterface();
          }
          const kc = document.getElementById("mainui-modes");
          if (kc) {
            let kd = 237;
            [...document.querySelectorAll(".item")].forEach(ke => {
              if (ke.className.indexOf("tourney") !== -1) {
                ke.style.display = "none";
                if (ke.classList.contains(this.tournamentMode)) {
                  ke.style.display = "flex";
                  kd += 67;
                }
              }
            });
            kc.style.height = kd + "px";
          }
        }
        openShopInterface(kg, kh = 0) {
          if (!this.isLogged) {
            alert("Please sign in to use shop");
            return;
          }
          let kj = "";
          kj += "<div onclick=\"raga.closeShopInterface();\" class=\"leagues-blocker\"><div class=\"disabler\"></div></div>";
          kj += "<div class=\"leagues-dialog\">";
          kj += "<span onclick=\"raga.closeShopInterface();\" class=\"leagues-inner-close sprite-main Close\"></span>";
          kj += "<h1>Raga Mode Shop</h1>";
          kj += "<div onclick=\"raga.openShopInterface(0);\" class=\"currency-container\"><span class=\"label\">" + this.getInterface().money + "</span><span class=\"icon sprite-main currency-icon raga-coins\"></span><div class=\"plus\"><span>+</span></div></div>";
          kj += "<div id=\"menu-leagues\">";
          kj += "<div class=\"button-row\">";
          kj += "<div class=\"button-cell\"><button onclick=\"raga.openShopInterface(0);\" class=\"btn btn-myleague" + (kg === 0 ? "-selected" : "") + " left\">Buy Coins</button></div>";
          kj += "<div class=\"button-cell\"><button onclick=\"raga.openShopInterface(1);\" class=\"btn btn-country" + (kg === 1 ? "-selected" : "") + "\">Rent Minions</button></div>";
          kj += "<div class=\"button-cell\"><button onclick=\"raga.openShopInterface(2);\" class=\"btn btn-world" + (kg === 2 ? "-selected" : "") + "\">Create Skin</button></div>";
          kj += "</div>";
          kj += "</div>";
          kj += "<div class=\"raga-mode-shop\">";
          if (kg === 0) {
            this.shops.filter(kk => kk.money.amount).forEach(kl => {
              kj += "<div onclick=\"raga.buyCoinsInterface(" + kl.id + ");\" class=\"coins-entry\"><div class=\"block first\">" + kl.money.amount + "</div><div class=\"block\">+</div><div class=\"block\"><span class=\"orange\">" + kl.money.bonus + "%</span></div><div class=\"block orange-text\">=</div><div class=\"block orange-text\">" + Math.round(kl.money.amount + kl.money.amount * (kl.money.bonus / 100)) + " <span class=\"sprite-main currency-icon raga-coins\" style=\"vertical-align: -3px;\"></span></div><div class=\"block\"><span class=\"light\">€" + kl.price.toFixed(2) + "</span></div><div class=\"block green last\">Buy</div></div>";
            });
          } else if (kg === 1) {
            kj += "<div class=\"minions-stop\">" + this.getInterface().minionsShop + "</div>";
            kj += "<div class=\"minions\">";
            if (this.minions.owner === this.ident && this.minions.state === 1 && this.minions.time() > 0) {
              kj += "<div class=\"friends\">";
              kj += "<div class=\"title\">Share With Friends</div>";
              kj += "<div class=\"block\">";
              this.friends.forEach(kn => {
                kj += "<input type=\"text\" spellcheck=\"false\" placeholder=\"Enter Friend's ID\" value=\"" + kn + "\" class=\"friend " + (kn ? "taken" : "") + "\" />";
              });
              kj += "</div>";
              kj += "<div onclick=\"raga.saveFriendsInterface();\" class=\"save\">Save</div>";
              kj += "<div class=\"refund-container\">" + this.getInterface().minionsShopRefund + "</div>";
              kj += "</div>";
            } else if (this.minions.owner === this.ident && this.minions.state === 2 && this.minions.time() > 0) {
              kj += "<div class=\"no-friends\">This rent can't be shared with friends</div>";
              kj += "<div class=\"refund-container\">" + this.getInterface().minionsShopRefund + "</div>";
            } else if (this.minions.owner !== this.ident && this.minions.time() > 0) {
              kj += "<div class=\"cancel-friendship\">";
              kj += "<div class=\"title\">Shared By</div>";
              kj += "<div class=\"block\"><div class=\"friendship\">" + this.minions.owner + "</div></div>";
              kj += "<div onclick=\"raga.cancelFriendshipInterface();\" class=\"cancel\">Cancel</div>";
              kj += "</div>";
            } else {
              if (this.serverFatMinions) {
                kj += "<div id=\"menu-leagues\" style=\"margin-top: 5px; margin-bottom: 15px; border-spacing: 0;\">";
                kj += "<div class=\"button-row\">";
                kj += "<div class=\"button-cell\"><button onclick=\"raga.openShopInterface(1, 0);\" class=\"btn btn-one" + (kh === 0 ? "-selected" : "") + " left\">Regular</button></div>";
                kj += "<div class=\"button-cell\"><button onclick=\"raga.openShopInterface(1, 1);\" class=\"btn btn-two" + (kh === 1 ? "-selected" : "") + "\">Solo Bundle (No Sharing)</button></div>";
                kj += "</div>";
                kj += "</div>";
              }
              if (kh === 0) {
                const kp = this.shops.filter(kq => kq.minions.state === 1);
                kp.filter(kr => kr.minions.fatAmount === 0).forEach(ks => {
                  kj += "<div class=\"minions-entry\">";
                  kj += "<div class=\"block\">";
                  kj += "<div class=\"btn-one title\">" + ks.minions.amount + " Minions</div>";
                  kj += "<div class=\"time\"><span class=\"clock-grey sprite-main\"></span>" + this.formatInterfaceTime(ks.minions.time) + "</div>";
                  kj += "<div class=\"hr\"></div>";
                  kj += "<div class=\"mass-selector\">";
                  kj += "<div onclick=\"raga.prepareMinionsInterface(this, " + ks.id + ", " + ks.price + ");\" class=\"selected\"><div></div><span>None</span></div>";
                  kp.filter(ku => ku.minions.amount === ks.minions.amount && ku.minions.time === ks.minions.time && ku.minions.fatAmount > 0).forEach(kv => {
                    kj += "<div onclick=\"raga.prepareMinionsInterface(this, " + kv.id + ", " + kv.price + ");\"><div></div><span>" + kv.minions.fatAmount + " Mass Minions</span></div>";
                  });
                  kj += "</div>";
                  kj += "</div>";
                  kj += "<div onclick=\"raga.buyMinionsInterface(this, " + ks.id + ");\" class=\"buy\">" + ks.price + " <span class=\"sprite-main currency-icon raga-coins\" style=\"vertical-align: -4px;\"></span></div>";
                  kj += "</div>";
                });
              } else if (kh === 1) {
                this.shops.filter(kx => kx.minions.state === 2).forEach(ky => {
                  kj += "<div class=\"minions-entry\"><div class=\"block\"><div class=\"btn-two title\">" + ky.minions.amount + " + " + ky.minions.fatAmount + " Minions</div><div class=\"time\">" + ky.minions.fatMass + " mass</div><div class=\"time\"><span class=\"clock-grey sprite-main\"></span>" + this.formatInterfaceTime(ky.minions.time) + "</div></div><div onclick=\"raga.buyMinionsInterface(this, " + ky.id + ");\" class=\"buy\">" + ky.price + " <span class=\"sprite-main currency-icon raga-coins\" style=\"vertical-align: -4px;\"></span></div></div>";
                });
              }
            }
            kj += "</div>";
          } else if (kg === 2) {
            if (kh === 0) {
              kj += "<div class=\"create-skin\">";
              kj += "<div class=\"instruction\">Recommended image size is 512 x 512 pixels</div>";
              kj += "<div class=\"border\">";
              kj += "<div onclick=\"raga.selectSkinBorderInterface(this);\" class=\"selected\"><span class=\"green\"></span></div>";
              kj += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"yellow\"></span></div>";
              kj += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"orange\"></span></div>";
              kj += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"red\"></span></div>";
              kj += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"violet\"></span></div>";
              kj += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"pink\"></span></div>";
              kj += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"blue\"></span></div>";
              kj += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"light-blue\"></span></div>";
              kj += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"white\"></span></div>";
              kj += "<div onclick=\"raga.selectSkinBorderInterface(this);\"><span class=\"black\"></span></div>";
              kj += "</div>";
              kj += "<canvas width=\"208\" height=\"208\"></canvas>";
              kj += "<label for=\"select-image-upload\" class=\"select-image\">Select image</label><input id=\"select-image-upload\" type=\"file\" accept=\"image/*\" onchange=\"raga.selectSkinImageInterface(this);\" />";
              kj += "<div class=\"serror\"></div>";
              kj += "<div onclick=\"raga.saveSkinInterface(this);\" class=\"save\">" + this.shops.find(la => la.skin).price + " <span class=\"sprite-main currency-icon raga-coins\" style=\"vertical-align: -4px;\"></span></div>";
              kj += "</div>";
            } else if (kh === 1) {
              kj += "<div class=\"create-skin\">";
              kj += "<div class=\"instruction\">Please wait while your skin is being created</div>";
              kj += "<div class=\"loader\"></div>";
              kj += "</div>";
            } else if (kh === 2) {
              kj += "<div class=\"create-skin\">";
              kj += "<div class=\"instruction\">Your skin is created and will be approved in 24 hours</div>";
              kj += "<div class=\"done sprite-common rush_icon\"></div>";
              kj += "</div>";
            }
          }
          kj += "</div>";
          kj += "</div>";
          const lb = document.createElement("div");
          lb.innerHTML = kj;
          const lc = document.getElementById("leagues-app");
          if (lc.lastChild.nodeType === 1) {
            lc.removeChild(lc.lastChild);
          }
          lc.appendChild(lb);
        }
        buyCoinsInterface(ld) {
          open("https://minions.raga.pw/ragamode/coins/" + this.ident + "/" + ld, "_blank");
        }
        prepareMinionsInterface(lf, lg, lh) {
          const lj = lf.parentNode.parentNode.parentNode;
          const lk = lj.querySelector(".buy");
          lk.innerHTML = lk.innerHTML.replace(/\d+/, lh);
          lk.setAttribute("onclick", "raga.buyMinionsInterface(this, " + lg + ");");
          const ll = lj.querySelector(".block .mass-selector>div.selected");
          ll.className = "";
          lf.className = "selected";
        }
        buyMinionsInterface(lm, ln) {
          if (!confirm("Are you sure you want to rent this package?")) {
            return;
          }
          if (parseInt(lm.innerHTML, 10) > this.money) {
            alert("You do not have enough Raga Coins");
            return;
          }
          const lp = new DataView(new ArrayBuffer(3));
          let lq = 0;
          lp.setUint8(lq, 32);
          lq += 1;
          lp.setUint16(lq, ln, true);
          const lr = new Uint8Array(lp.buffer);
          window.core.proxyMobileData(lr);
          window.core.proxyMobileData(new Uint8Array([9]));
        }
        saveFriendsInterface() {
          const lt = Array.prototype.slice.call(document.querySelectorAll(".raga-mode-shop .minions .friends .block .friend"));
          const lu = 3 + lt.reduce((lv, lw) => lv + unescape(encodeURIComponent(lw.value)).length + 1, 0);
          const lx = new DataView(new ArrayBuffer(lu));
          let ly = 0;
          lx.setUint8(ly, 33);
          ly += 1;
          lx.setUint16(ly, lt.length, true);
          ly += 2;
          lt.forEach(lz => {
            unescape(encodeURIComponent(lz.value)).split("").forEach(md => {
              lx.setUint8(ly++, md.charCodeAt(0));
            });
            lx.setUint8(ly, 0);
            ly += 1;
          });
          const mf = new Uint8Array(lx.buffer);
          window.core.proxyMobileData(mf);
          window.core.proxyMobileData(new Uint8Array([9]));
        }
        refundMinionsInterface() {
          if (!confirm("Are you sure you want to stop this rent and get your coins back?")) {
            return;
          }
          window.core.proxyMobileData(new Uint8Array([161]));
          window.core.proxyMobileData(new Uint8Array([9]));
        }
        supportMinionsInterface() {
          this.openCommunityInterface();
        }
        cancelFriendshipInterface() {
          if (!confirm("Are you sure you want to cancel this rent?")) {
            return;
          }
          window.core.proxyMobileData(new Uint8Array([34]));
          window.core.proxyMobileData(new Uint8Array([9]));
        }
        selectSkinImageInterface(mj) {
          const ml = mj.files[0];
          const mm = document.querySelector(".raga-mode-shop .create-skin .border>div.selected>span");
          const mn = getComputedStyle(mm).backgroundColor;
          this.drawSkinInterface(ml, mn);
        }
        selectSkinBorderInterface(mo) {
          const mq = document.getElementById("select-image-upload");
          const mr = mq.files[0];
          const ms = getComputedStyle(mo.firstChild).backgroundColor;
          this.drawSkinInterface(mr, ms);
          const mt = document.querySelector(".raga-mode-shop .create-skin .border>div.selected");
          mt.className = "";
          mo.className = "selected";
          mo.style.borderColor = ms;
        }
        drawSkinInterface(mu, mv) {
          const mx = document.querySelector(".raga-mode-shop .create-skin canvas").getContext("2d");
          const my = new Image();
          my.onload = () => {
            mx.clearRect(0, 0, mx.canvas.width, mx.canvas.height);
            mx.save();
            mx.beginPath();
            mx.arc(mx.canvas.width / 2, mx.canvas.height / 2, 100, 0, Math.PI * 2, true);
            mx.closePath();
            mx.clip();
            mx.drawImage(my, my.naturalWidth / 2 - 256, my.naturalHeight / 2 - 256, 512, 512, mx.canvas.width / 2 - 100, mx.canvas.width / 2 - 100, 200, 200);
            mx.restore();
            mx.strokeStyle = mv;
            mx.lineWidth = 4;
            mx.beginPath();
            mx.arc(mx.canvas.width / 2, mx.canvas.height / 2, 100, 0, Math.PI * 2, true);
            mx.closePath();
            mx.stroke();
            const na = document.querySelector(".raga-mode-shop .create-skin .border");
            na.style.display = "block";
            mx.canvas.style.display = "block";
            const nb = document.querySelector(".raga-mode-shop .create-skin .serror");
            const nc = document.querySelector(".raga-mode-shop .create-skin .save");
            if (mu.size > 1048576) {
              nb.innerHTML = "Maximum file size is 1 MB";
              nb.style.display = "block";
              nc.style.display = "none";
            } else if (my.naturalWidth < 512 || my.naturalHeight < 512) {
              nb.innerHTML = "Selected image is too small";
              nb.style.display = "block";
              nc.style.display = "none";
            } else {
              nb.style.display = "none";
              nc.style.display = "block";
            }
          };
          const nd = new FileReader();
          nd.onloadend = () => {
            my.src = nd.result;
          };
          nd.readAsDataURL(mu);
        }
        async saveSkinInterface(nf) {
          if (!confirm("Are you sure you want to create this skin?")) {
            return;
          }
          if (parseInt(nf.innerHTML, 10) > this.money) {
            alert("You do not have enough Raga Coins");
            return;
          }
          const nh = document.getElementById("select-image-upload");
          const ni = nh.files[0];
          const nj = document.querySelector(".raga-mode-shop .create-skin .border>div.selected>span");
          const nk = getComputedStyle(nj).backgroundColor;
          const nl = nk.match(/\d+/g).map(nm => parseInt(nm, 10));
          const nn = (nl[0] << 16) + (nl[1] << 8) + nl[2];
          const np = new FormData();
          np.append("skin", ni);
          np.append("color", nn.toString());
          this.openShopInterface(2, 1);
          const nq = await fetch("https://minions.raga.pw/ragamode/skins", {
            cache: "no-store",
            method: "POST",
            body: np
          }).then(nr => nr.json()).catch(() => {});
          if (nq && nq.status === "OK") {
            const ns = new Uint8Array([35, ...unescape(encodeURIComponent(nq.claim)).split("").map(nt => nt.charCodeAt(0)), 0]);
            window.core.proxyMobileData(ns);
            window.core.proxyMobileData(new Uint8Array([9]));
            this.openShopInterface(2, 2);
          }
        }
        closeShopInterface() {
          const nv = document.getElementById("leagues-app");
          if (nv.lastChild.nodeType === 1) {
            nv.removeChild(nv.lastChild);
          }
        }
        openSettingsInterface() {
          if (!this.isLogged) {
            alert("Please sign in to use settings");
            return;
          }
          let ny = "";
          ny += "<div onclick=\"raga.closeSettingsInterface();\" class=\"leagues-blocker\"><div class=\"disabler\"></div></div>";
          ny += "<div class=\"leagues-dialog\">";
          ny += "<span onclick=\"raga.closeSettingsInterface();\" class=\"leagues-inner-close sprite-main Close\"></span>";
          ny += "<h1>Raga Mode Settings</h1>";
          ny += "<div class=\"raga-mode-settings\">";
          ny += "<div class=\"settings-entry general\">";
          ny += "<div class=\"section\">General</div>";
          this.settings.filter(nz => nz.section === "general").forEach(oa => {
            ny += "<div class=\"command\"><div class=\"name\">" + oa.name + "</div><select onfocus=\"this.oldValue = this.value;\" onchange=\"raga.changeSettingsInterface(this);\" data-ident=\"" + oa.ident + "\" class=\"select\">" + oa.command.map(oc => "<option value=\"" + oc.value + "\" " + (oc.value === oa.value ? "selected" : "") + ">" + oc.name + "</option>").join() + "</select></div>";
          });
          ny += "</div>";
          ny += "<div class=\"settings-entry\">";
          ny += "<div class=\"section\">Player</div>";
          this.settings.filter(od => od.section === "player").forEach(oe => {
            ny += "<div class=\"command\"><div class=\"name\">" + oe.name + "</div><div onclick=\"raga.changeSettingsInterface(this);\" data-ident=\"" + oe.ident + "\" data-active=\"Press a key\" class=\"value " + (this.settings.filter(og => typeof og.command === "function" && og.value === oe.value).length > 1 ? "conflict" : "") + "\"><span>" + oe.value.replace(" ", "space").toUpperCase() + "</span></div></div>";
          });
          ny += "</div>";
          ny += "<div class=\"settings-entry\">";
          ny += "<div class=\"section\">Minion</div>";
          this.settings.filter(oh => oh.section === "minion").forEach(oi => {
            ny += "<div class=\"command\"><div class=\"name\">" + oi.name + "</div><div onclick=\"raga.changeSettingsInterface(this);\" data-ident=\"" + oi.ident + "\" data-active=\"Press a key\" class=\"value " + (this.settings.filter(ol => typeof ol.command === "function" && ol.value === oi.value).length > 1 ? "conflict" : "") + "\"><span>" + oi.value.replace(" ", "space").toUpperCase() + "</span></div></div>";
          });
          ny += "</div>";
          ny += "</div>";
          ny += "</div>";
          const om = document.createElement("div");
          om.innerHTML = ny;
          const on = document.getElementById("leagues-app");
          if (on.lastChild.nodeType === 1) {
            on.removeChild(on.lastChild);
          }
          on.appendChild(om);
        }
        changeSettingsInterface(oo) {
          const oq = this.settings.find(or => or.ident === oo.getAttribute("data-ident"));
          if (oq.section === "general") {
            if (oq.ident === "connection") {
              if (!confirm("The game will restart now to apply the changes")) {
                oo.value = oo.oldValue;
                return;
              }
            }
            const os = oq.ident + ":" + oo.value;
            const ot = new Uint8Array([36, ...unescape(encodeURIComponent(os)).split("").map(ou => ou.charCodeAt(0)), 0]);
            window.core.proxyMobileData(ot);
            window.core.proxyMobileData(new Uint8Array([9]));
          } else if (!this.changingSettings) {
            this.changingSettings = {
              element: oo,
              entry: oq
            };
            oo.classList.toggle("active");
          } else if (oq.ident === this.changingSettings.entry.ident) {
            this.changingSettings = null;
            oo.classList.toggle("active");
          }
        }
        closeSettingsInterface() {
          this.changingSettings = null;
          const ow = document.getElementById("leagues-app");
          if (ow.lastChild.nodeType === 1) {
            ow.removeChild(ow.lastChild);
          }
        }
        openCommunityInterface() {
          open("https://discord.com/invite/UK4R9fg", "_blank");
        }
        openSkinSelectorInterface(oy) {
          if (!this.isLogged) {
            alert("Please sign in to use skins");
            return;
          }
          let pa = "";
          pa += "<div onclick=\"raga.closeSkinSelectorInterface();\" class=\"leagues-blocker\"><div class=\"disabler\"></div></div>";
          pa += "<div class=\"leagues-dialog\">";
          pa += "<span onclick=\"raga.closeSkinSelectorInterface();\" class=\"leagues-inner-close sprite-main Close\"></span>";
          pa += "<h1>Raga Mode Skins</h1>";
          pa += "<div id=\"menu-leagues\" style=\"margin-top: 15px;\">";
          pa += "<div class=\"button-row\">";
          pa += "<div class=\"button-cell\"><button onclick=\"raga.openSkinSelectorInterface(0);\" class=\"btn btn-world" + (oy === 0 ? "-selected" : "") + " left\">Normal</button></div>";
          pa += "<div class=\"button-cell\"><button onclick=\"raga.openSkinSelectorInterface(1);\" class=\"btn btn-world" + (oy === 1 ? "-selected" : "") + "\">Custom</button></div>";
          pa += "</div>";
          pa += "</div>";
          pa += "<div class=\"raga-mode-skin-selector\">";
          if (oy === 0) {
            this.agarioSkins.forEach(pb => {
              pa += "<div onclick=\"raga.setSkinInterface(this, '" + pb.ident + "');\" class=\"skin-entry " + (pb.ident === this.skin ? "selected" : "") + "\" style=\"background-image: url('" + pb.url.replace(".png", "_low.png") + "'); border: 3px solid #" + pb.color.toString(16).padStart(6, "0") + ";\"></div>";
            });
          } else if (oy === 1) {
            this.ownedSkins.forEach(pd => {
              const pf = this.skins.find(pg => pg.ident === pd);
              if (!pf) {
                pa += "<div onclick=\"raga.setSkinInterface(this);\" class=\"skin-entry pending\" style=\"background-image: url('https://minions.raga.pw/ragamode/skins/small/" + pd + "'); border: 3px solid #ffffff;\">";
                pa += "<div class=\"sprite-common rush_icon\"></div>";
                pa += "<div class=\"overlay-container\">";
                pa += "<div onclick=\"raga.copySkinInterface('" + pd + "', event);\" class=\"copy\"></div>";
                pa += "</div>";
                pa += "</div>";
              } else {
                pa += "<div onclick=\"raga.setSkinInterface(this, '" + pf.ident + "');\" class=\"skin-entry " + (pf.ident === this.skin ? "selected" : "") + "\" style=\"background-image: url('" + pf.url.replace("/normal/", "/small/") + "'); border: 3px solid #" + (pf.color >= 0 ? pf.color : 16777215).toString(16).padStart(6, "0") + ";\">";
                pa += "<div class=\"overlay-container\">";
                pa += "<div onclick=\"raga.removeSkinInterface(this, '" + pf.ident + "', event);\" class=\"remove\" style=\"visibility: " + (pf.ident !== this.skin ? "visible" : "hidden") + ";\"></div>";
                pa += "<div onclick=\"raga.copySkinInterface('" + pf.ident + "', event);\" class=\"copy\"></div>";
                pa += "</div>";
                pa += "</div>";
              }
            });
          }
          pa += "</div>";
          pa += "</div>";
          const ph = document.createElement("div");
          ph.innerHTML = pa;
          const pj = document.getElementById("leagues-app");
          if (pj.lastChild.nodeType === 1) {
            pj.removeChild(pj.lastChild);
          }
          pj.appendChild(ph);
        }
        setSkinInterface(pk, pl = null) {
          if (window.core.playerHasCells()) {
            alert("You can't change skin while playing");
            return;
          }
          if (!pl) {
            alert("This skin is not approved yet");
            return;
          }
          const pn = pk.classList.contains("selected") ? "" : pl;
          const po = new Uint8Array([37, ...unescape(encodeURIComponent(pn)).split("").map(pp => pp.charCodeAt(0)), 0]);
          window.core.proxyMobileData(po);
          window.core.proxyMobileData(new Uint8Array([9]));
          const pq = document.querySelector(".raga-mode-skin-selector .skin-entry.selected");
          if (pq) {
            pq.classList.toggle("selected");
            if (pq.children.length) {
              pq.children[0].children[0].style.visibility = "visible";
            }
          }
          if (pk !== pq) {
            pk.classList.toggle("selected");
            if (pk.children.length) {
              pk.children[0].children[0].style.visibility = "hidden";
            }
          }
        }
        removeSkinInterface(pr, ps, pt) {
          if (confirm("Are you sure you want to remove this skin, coins will not be refunded?")) {
            const pv = new Uint8Array([160, ...unescape(encodeURIComponent(ps)).split("").map(py => py.charCodeAt(0)), 0]);
            window.core.proxyMobileData(pv);
            window.core.proxyMobileData(new Uint8Array([9]));
            pr.parentNode.parentNode.remove();
          }
          pt.stopPropagation();
        }
        copySkinInterface(pz, qa) {
          navigator.clipboard.writeText(pz).then(() => alert("Skin ID is copied to clipboard"));
          qa.stopPropagation();
        }
        closeSkinSelectorInterface() {
          const qd = document.getElementById("leagues-app");
          if (qd.lastChild.nodeType === 1) {
            qd.removeChild(qd.lastChild);
          }
        }
        checkSpawnInterface() {
          const qf = document.getElementById("nick");
          const qh = document.getElementById("play");
          if (this.gameMode && this.tournamentMode && this.gameMode === this.tournamentMode && !this.isAuthSent) {
            qf.disabled = true;
            qh.innerHTML = "Please Wait";
            qh.disabled = true;
          } else {
            qf.disabled = false;
            qh.innerHTML = "Play";
            qh.disabled = false;
          }
        }
        switchInterface() {
          if (document.getElementById("mainui-user") && this.gameMode) {
            if (this.gameModes.find(qj => qj.type === this.gameMode)) {
              const qk = document.querySelector(".user-container");
              qk.style.display = "none";
              let ql = document.querySelector(".new-user-container");
              if (!ql) {
                let qm = "";
                qm += "<img src=\"" + this.getInterface().profileImage + "\" class=\"user-picture\" />";
                qm += "<div onclick=\"raga.openShopInterface(0);\" class=\"currency-container\"><span class=\"label\">" + this.getInterface().money + "</span><span class=\"icon sprite-main currency-icon raga-coins\"></span><div class=\"plus\"><span>+</span></div></div>";
                qm += "<div class=\"ident-container\">" + this.getInterface().ident + "</div>";
                qm += "<div class=\"user-name\">" + this.getInterface().profileName + "</div>";
                qm += "<div class=\"progress-bar-container\"><div class=\"progress-bar\" style=\"width: 0%;\"></div><span class=\"progress-bar-text\">" + this.getInterface().minions + "</span></div>";
                ql = document.createElement("div");
                ql.className = "new-user-container";
                ql.innerHTML = qm;
                qk.parentNode.appendChild(ql);
              }
              ql.style.display = "block";
              const qn = document.querySelector(".offers-container");
              qn.style.display = "none";
              let qo = document.querySelector(".new-offers-container");
              if (!qo) {
                let qp = "";
                qp += "<div class=\"buttons-container\">";
                qp += "<div onclick=\"raga.openShopInterface(0);\" class=\"shop\"><span class=\"label\">Shop</span><span class=\"sprite-main Icon-Store\"></span></div>";
                qp += "<div onclick=\"raga.openSettingsInterface();\" class=\"settings\"><span class=\"label\">Settings</span><span class=\"sprite-main controller\"></span></div>";
                qp += "<div onclick=\"raga.openCommunityInterface();\" class=\"community\"><span class=\"label\">Community</span><span class=\"sprite-main Icon-Leaderboards\"></span></div>";
                qp += "</div>";
                qo = document.createElement("div");
                qo.className = "new-offers-container";
                qo.innerHTML = qp;
                qn.parentNode.appendChild(qo);
              }
              qo.style.display = "block";
              const qq = document.getElementById("mainui-features");
              qq.style.display = "none";
              const qr = document.querySelector(".bubble");
              if (qr) {
                qr.style.display = "none";
              }
              const qs = document.getElementById("skinButton");
              qs.style.display = "none";
              const qt = document.getElementById("new-skinButton");
              qt.style.display = "";
            } else {
              const qu = document.querySelector(".user-container");
              qu.style.display = "block";
              const qv = document.querySelector(".new-user-container");
              if (qv) {
                qv.style.display = "none";
              }
              const qw = document.querySelector(".offers-container");
              qw.style.display = "block";
              const qx = document.querySelector(".new-offers-container");
              if (qx) {
                qx.style.display = "none";
              }
              const qy = document.getElementById("mainui-features");
              qy.style.display = "block";
              const qz = document.querySelector(".bubble");
              if (qz) {
                qz.style.display = "block";
              }
              const ra = document.getElementById("skinButton");
              ra.style.display = "";
              const rb = document.getElementById("new-skinButton");
              rb.style.display = "none";
            }
            this.checkSpawnInterface();
            this.closeShopInterface();
          }
        }
        renderCounter(rd) {
          const rf = rd * 13;
          const rg = rd * 14;
          this.hud.counter.font = rf + "px Ubuntu";
          const rh = this.hud.counter.measureText(this.developer).width;
          const ri = this.hud.counter.measureText("M").width;
          const rj = rh + rd * 60;
          const rk = ri + rd * 10;
          this.hud.counter.font = rg + "px Ubuntu";
          const rl = this.hud.counter.measureText(this.hud.utils.getSurvivorCoins()).width;
          const rn = this.hud.counter.measureText("M").width;
          this.hud.counter.font = rf + "px Ubuntu";
          const ro = rl + rd * 50;
          const rp = rn + rd * 15;
          const rq = rd * 60;
          const rr = rd * 8;
          const rs = rd * 16;
          const rt = rd * 16;
          const ru = this.hud.counter.measureText(this.hud.utils.getGameMode()).width;
          const rv = rd * 30;
          const rw = rd * 35;
          const rx = rd * 16;
          const ry = rd * 16;
          const rz = this.hud.counter.measureText(this.hud.utils.getMinions()).width;
          const sa = rd * 300;
          const sb = rk / 2 + rq + rp;
          this.hud.counter.canvas.width = sa;
          this.hud.counter.canvas.height = sb;
          this.hud.counter.clearRect(0, 0, this.hud.counter.canvas.width, this.hud.counter.canvas.height);
          this.hud.counter.font = rf + "px Ubuntu";
          this.hud.counter.fillStyle = "rgba(0, 0, 0, 0.4)";
          this.hud.utils.roundedRectangle(this.hud.counter, 0, rk / 2, sa, rq, rq / 1.8).fill();
          this.hud.counter.fillStyle = "#21b8fa";
          this.hud.utils.roundedRectangle(this.hud.counter, this.hud.counter.canvas.width / 2 - rj / 2, 0, rj, rk, rk / 1.8).fill();
          this.hud.counter.fillStyle = "#ffffff";
          this.hud.counter.fillText(this.developer, this.hud.counter.canvas.width / 2 - rh / 2, rk / 2 + ri / 2.5);
          const sc = new Image();
          sc.src = this.hud.images.gameMode;
          this.hud.counter.drawImage(sc, rq / 1.8 / 2 + (this.hud.counter.canvas.width / 2 - rq / 1.8 / 2 - rv / 2 - (rs + rr + ru)) / 2, this.hud.counter.canvas.height / 2 - rt / 2 + rk / 4 - rp / 2, rs, rt);
          this.hud.counter.fillText(this.hud.utils.getGameMode(), rq / 1.8 / 2 + (this.hud.counter.canvas.width / 2 - rq / 1.8 / 2 - rv / 2 - (rs + rr + ru)) / 2 + rs + rr, this.hud.counter.canvas.height / 2 + this.hud.counter.measureText("M").width / 2.5 + rk / 4 - rp / 2);
          const sd = new Image();
          sd.src = this.hud.images.logo;
          this.hud.counter.drawImage(sd, this.hud.counter.canvas.width / 2 - rv / 2, this.hud.counter.canvas.height / 2 - rw / 2 + rk / 2 - rp / 1.6, rv, rw);
          const se = new Image();
          se.src = this.hud.images.minions;
          this.hud.counter.drawImage(se, this.hud.counter.canvas.width / 2 + rv / 2 + (this.hud.counter.canvas.width / 2 - rv / 2 - rq / 1.8 / 2 - (rx + rr + rz)) / 2, this.hud.counter.canvas.height / 2 - ry / 2 + rk / 4 - rp / 2, rx, ry);
          this.hud.counter.fillText(this.hud.utils.getMinions(), this.hud.counter.canvas.width / 2 + rv / 2 + (this.hud.counter.canvas.width / 2 - rv / 2 - rq / 1.8 / 2 - (rx + rr + rz)) / 2 + rx + rr, this.hud.counter.canvas.height / 2 + this.hud.counter.measureText("M").width / 2.5 + rk / 4 - rp / 2);
          this.hud.counter.fillStyle = "#21b8fa";
          this.hud.utils.roundedRectangle(this.hud.counter, this.hud.counter.canvas.width / 2 - ro / 2, this.hud.counter.canvas.height - rp - rp / 4, ro, rp, rp / 2).fill();
          this.hud.counter.fillStyle = "#ffffff";
          this.hud.counter.fillText(this.hud.utils.getSurvivorCoins(), this.hud.counter.canvas.width / 2 - rl / 2, this.hud.counter.canvas.height - rp / 2 - rn / 3.5);
          return this.hud.counter.canvas;
        }
        renderTournamentCounterSolo(sf) {
          const sh = sf * 13;
          const si = sf * 16;
          this.hud.tournamentCounter.font = sh + "px Ubuntu";
          const sj = this.hud.tournamentCounter.measureText("Raga Tournament").width;
          const sk = this.hud.tournamentCounter.measureText("M").width;
          const sl = sj + sf * 60;
          const sm = sk + sf * 10;
          this.hud.tournamentCounter.font = si + "px Ubuntu";
          let sn = "";
          let so = [];
          let sp = 0;
          if (this.tournament.message) {
            sn = this.tournament.message;
            const sq = sn.split(",");
            if (sq.length === 3) {
              so = sq;
              sp = sf * 50;
            }
          } else {
            sn = new Date(this.tournament.time * 1000).toISOString().substr(14, 5);
          }
          let sr = this.hud.tournamentCounter.measureText(sn).width;
          if (so.length === 3) {
            so.forEach((ss, st) => {
              while (this.hud.tournamentCounter.measureText(ss).width > Math.round(this.hud.tournamentCounter.canvas.width * 0.6)) {
                ss = ss.slice(0, -1);
              }
              so[st] = ss;
            });
            sr = this.hud.tournamentCounter.measureText(so.reduce((sv, sw) => this.hud.tournamentCounter.measureText(sv).width > this.hud.tournamentCounter.measureText(sw).width ? sv : sw)).width + sf * 10;
          }
          const sx = this.hud.tournamentCounter.measureText("M").width;
          this.hud.tournamentCounter.font = sh + "px Ubuntu";
          const sy = sr + sf * 60;
          const sz = sx + sf * 20;
          const ta = sf * 70;
          const tb = sf * 8;
          this.hud.tournamentCounter.font = si + "px Ubuntu";
          const tc = this.hud.tournamentCounter.measureText("Alive").width;
          const td = this.hud.tournamentCounter.measureText(this.tournament.alive).width;
          this.hud.tournamentCounter.font = sh + "px Ubuntu";
          const te = sf * 30;
          const tf = sf * 35;
          this.hud.tournamentCounter.font = si + "px Ubuntu";
          const tg = this.hud.tournamentCounter.measureText("Dead").width;
          const th = this.hud.tournamentCounter.measureText(this.tournament.dead).width;
          this.hud.tournamentCounter.font = sh + "px Ubuntu";
          const ti = sf * 400;
          const tj = sm / 2 + ta + sz + sp;
          this.hud.tournamentCounter.canvas.width = ti;
          this.hud.tournamentCounter.canvas.height = tj;
          this.hud.tournamentCounter.clearRect(0, 0, this.hud.tournamentCounter.canvas.width, this.hud.tournamentCounter.canvas.height);
          this.hud.tournamentCounter.font = sh + "px Ubuntu";
          this.hud.tournamentCounter.fillStyle = "rgba(0, 0, 0, 0.4)";
          this.hud.utils.roundedRectangle(this.hud.tournamentCounter, 0, sm / 2, ti, ta, ta / 1.8).fill();
          this.hud.tournamentCounter.fillStyle = "#21b8fa";
          this.hud.utils.roundedRectangle(this.hud.tournamentCounter, this.hud.tournamentCounter.canvas.width / 2 - sl / 2, 0, sl, sm, sm / 1.8).fill();
          this.hud.tournamentCounter.fillStyle = "#ffffff";
          this.hud.tournamentCounter.fillText("Raga Tournament", this.hud.tournamentCounter.canvas.width / 2 - sj / 2, sm / 2 + sk / 2.5);
          this.hud.tournamentCounter.font = si + "px Ubuntu";
          this.hud.tournamentCounter.fillStyle = "#ffffff";
          this.hud.tournamentCounter.fillText("Alive", ta / 1.8 / 2 + (this.hud.tournamentCounter.canvas.width / 2 - ta / 1.8 / 2 - te / 2 - (tc + tb + td)) / 2, (this.hud.tournamentCounter.canvas.height - sp) / 2 + this.hud.tournamentCounter.measureText("M").width / 2.5 - sz / 3);
          this.hud.tournamentCounter.fillText(this.tournament.alive, ta / 1.8 / 2 + (this.hud.tournamentCounter.canvas.width / 2 - ta / 1.8 / 2 - te / 2 - (tc + tb + td)) / 2 + tc + tb, (this.hud.tournamentCounter.canvas.height - sp) / 2 + this.hud.tournamentCounter.measureText("M").width / 2.5 - sz / 3);
          this.hud.tournamentCounter.fillStyle = "#ffffff";
          const tk = new Image();
          tk.src = this.hud.images.logo;
          this.hud.tournamentCounter.drawImage(tk, this.hud.tournamentCounter.canvas.width / 2 - te / 2, (this.hud.tournamentCounter.canvas.height - sp) / 2 - tf / 2 - sz / 4, te, tf);
          this.hud.tournamentCounter.fillStyle = "#ffffff";
          this.hud.tournamentCounter.fillText("Dead", this.hud.tournamentCounter.canvas.width / 2 + te / 2 + (this.hud.tournamentCounter.canvas.width / 2 - te / 2 - ta / 1.8 / 2 - (tg + tb + th)) / 2, (this.hud.tournamentCounter.canvas.height - sp) / 2 + this.hud.tournamentCounter.measureText("M").width / 2.5 - sz / 3);
          this.hud.tournamentCounter.fillText(this.tournament.dead, this.hud.tournamentCounter.canvas.width / 2 + te / 2 + (this.hud.tournamentCounter.canvas.width / 2 - te / 2 - ta / 1.8 / 2 - (tg + tb + th)) / 2 + tg + tb, (this.hud.tournamentCounter.canvas.height - sp) / 2 + this.hud.tournamentCounter.measureText("M").width / 2.5 - sz / 3);
          this.hud.tournamentCounter.fillStyle = "#21b8fa";
          this.hud.utils.roundedRectangle(this.hud.tournamentCounter, this.hud.tournamentCounter.canvas.width / 2 - sy / 2, this.hud.tournamentCounter.canvas.height - sp - sz - sz / 4, sy, sz + sp, sz / 2).fill();
          if (so.length === 3) {
            let tl = 0;
            let tm = 1;
            so.forEach(tn => {
              if (tm === 1) {
                this.hud.tournamentCounter.fillStyle = "#e9e077";
              } else if (tm === 2) {
                this.hud.tournamentCounter.fillStyle = "#d4d4d4";
              } else if (tm === 3) {
                this.hud.tournamentCounter.fillStyle = "#f8c48c";
              }
              this.hud.tournamentCounter.fillText(tm++ + ". " + tn, this.hud.tournamentCounter.canvas.width / 2 - sr / 2, this.hud.tournamentCounter.canvas.height - sp - sz / 2 - sx / 3 + tl);
              tl += sf * 25;
            });
          } else {
            this.hud.tournamentCounter.fillStyle = "#ffffff";
            this.hud.tournamentCounter.fillText(sn, this.hud.tournamentCounter.canvas.width / 2 - sr / 2, this.hud.tournamentCounter.canvas.height - sp - sz / 2 - sx / 3);
          }
          return this.hud.tournamentCounter.canvas;
        }
        renderTournamentCounterTeams(tq) {
          const ts = tq * 13;
          const tt = tq * 16;
          this.hud.tournamentCounter.font = ts + "px Ubuntu";
          const tu = this.hud.tournamentCounter.measureText("Raga Tournament").width;
          const tv = this.hud.tournamentCounter.measureText("M").width;
          const tw = tu + tq * 60;
          const tx = tv + tq * 10;
          this.hud.tournamentCounter.font = tt + "px Ubuntu";
          let ty = "";
          if (this.tournament.message && this.tournament.time > 0) {
            ty = "Draw in " + this.tournament.time + "!";
          } else if (this.tournament.message) {
            ty = this.tournament.message;
          } else {
            ty = new Date(this.tournament.time * 1000).toISOString().substr(14, 5);
          }
          const tz = this.hud.tournamentCounter.measureText(ty).width;
          const ua = this.hud.tournamentCounter.measureText("M").width;
          this.hud.tournamentCounter.font = ts + "px Ubuntu";
          const ub = tz + tq * 60;
          const uc = ua + tq * 20;
          const ud = tq * 70;
          const ue = tq * 8;
          this.hud.tournamentCounter.font = tt + "px Ubuntu";
          const uf = this.hud.tournamentCounter.measureText(this.tournament.team1Tag).width;
          const ug = this.hud.tournamentCounter.measureText(this.tournament.team1Score).width;
          this.hud.tournamentCounter.font = ts + "px Ubuntu";
          const uh = tq * 30;
          const ui = tq * 35;
          this.hud.tournamentCounter.font = tt + "px Ubuntu";
          const uj = this.hud.tournamentCounter.measureText(this.tournament.team2Tag).width;
          const uk = this.hud.tournamentCounter.measureText(this.tournament.team2Score).width;
          this.hud.tournamentCounter.font = ts + "px Ubuntu";
          const ul = tq * 400;
          const um = tx / 2 + ud + uc;
          this.hud.tournamentCounter.canvas.width = ul;
          this.hud.tournamentCounter.canvas.height = um;
          this.hud.tournamentCounter.clearRect(0, 0, this.hud.tournamentCounter.canvas.width, this.hud.tournamentCounter.canvas.height);
          this.hud.tournamentCounter.font = ts + "px Ubuntu";
          this.hud.tournamentCounter.fillStyle = "rgba(0, 0, 0, 0.4)";
          this.hud.utils.roundedRectangle(this.hud.tournamentCounter, 0, tx / 2, ul, ud, ud / 1.8).fill();
          this.hud.tournamentCounter.fillStyle = "#21b8fa";
          this.hud.utils.roundedRectangle(this.hud.tournamentCounter, this.hud.tournamentCounter.canvas.width / 2 - tw / 2, 0, tw, tx, tx / 1.8).fill();
          this.hud.tournamentCounter.fillStyle = "#ffffff";
          this.hud.tournamentCounter.fillText("Raga Tournament", this.hud.tournamentCounter.canvas.width / 2 - tu / 2, tx / 2 + tv / 2.5);
          this.hud.tournamentCounter.font = tt + "px Ubuntu";
          this.hud.tournamentCounter.fillStyle = "#cccccc";
          if (this.tournament.team1Color === 1) {
            this.hud.tournamentCounter.fillStyle = "#bff3b0";
          } else if (this.tournament.team1Color === 2) {
            this.hud.tournamentCounter.fillStyle = "#f3b0b0";
          }
          this.hud.tournamentCounter.fillText(this.tournament.team1Tag, ud / 1.8 / 2 + (this.hud.tournamentCounter.canvas.width / 2 - ud / 1.8 / 2 - uh / 2 - (uf + ue + ug)) / 2, this.hud.tournamentCounter.canvas.height / 2 + this.hud.tournamentCounter.measureText("M").width / 2.5 - uc / 3);
          this.hud.tournamentCounter.fillText(this.tournament.team1Score, ud / 1.8 / 2 + (this.hud.tournamentCounter.canvas.width / 2 - ud / 1.8 / 2 - uh / 2 - (uf + ue + ug)) / 2 + uf + ue, this.hud.tournamentCounter.canvas.height / 2 + this.hud.tournamentCounter.measureText("M").width / 2.5 - uc / 3);
          this.hud.tournamentCounter.fillStyle = "#ffffff";
          const un = new Image();
          un.src = this.hud.images.logo;
          this.hud.tournamentCounter.drawImage(un, this.hud.tournamentCounter.canvas.width / 2 - uh / 2, this.hud.tournamentCounter.canvas.height / 2 - ui / 2 - uc / 4, uh, ui);
          this.hud.tournamentCounter.fillStyle = "#cccccc";
          if (this.tournament.team2Color === 1) {
            this.hud.tournamentCounter.fillStyle = "#bff3b0";
          } else if (this.tournament.team2Color === 2) {
            this.hud.tournamentCounter.fillStyle = "#f3b0b0";
          }
          this.hud.tournamentCounter.fillText(this.tournament.team2Tag, this.hud.tournamentCounter.canvas.width / 2 + uh / 2 + (this.hud.tournamentCounter.canvas.width / 2 - uh / 2 - ud / 1.8 / 2 - (uj + ue + uk)) / 2, this.hud.tournamentCounter.canvas.height / 2 + this.hud.tournamentCounter.measureText("M").width / 2.5 - uc / 3);
          this.hud.tournamentCounter.fillText(this.tournament.team2Score, this.hud.tournamentCounter.canvas.width / 2 + uh / 2 + (this.hud.tournamentCounter.canvas.width / 2 - uh / 2 - ud / 1.8 / 2 - (uj + ue + uk)) / 2 + uj + ue, this.hud.tournamentCounter.canvas.height / 2 + this.hud.tournamentCounter.measureText("M").width / 2.5 - uc / 3);
          this.hud.tournamentCounter.fillStyle = "#21b8fa";
          this.hud.utils.roundedRectangle(this.hud.tournamentCounter, this.hud.tournamentCounter.canvas.width / 2 - ub / 2, this.hud.tournamentCounter.canvas.height - uc - uc / 4, ub, uc, uc / 2).fill();
          this.hud.tournamentCounter.fillStyle = "#ffffff";
          this.hud.tournamentCounter.fillText(ty, this.hud.tournamentCounter.canvas.width / 2 - tz / 2, this.hud.tournamentCounter.canvas.height - uc / 2 - ua / 3);
          return this.hud.tournamentCounter.canvas;
        }
        renderLoop() {
          if (!this.isSetup || document.getElementById("mainui-play").style.display === "") {
            return;
          }
          const up = Math.min(this.canvas.canvas.width / 1920, this.canvas.canvas.height / 1080) * 1.1;
          if (this.gameMode !== "ragatourney-solo" && this.gameMode !== "ragatourney-teams") {
            this.canvas.drawImage(this.renderCounter(2), up * 12, up * 12, this.hud.counter.canvas.width / 2 * up, this.hud.counter.canvas.height / 2 * up);
          } else if (this.gameMode === "ragatourney-solo" && (this.tournament.alive || this.tournament.dead)) {
            this.canvas.drawImage(this.renderTournamentCounterSolo(2), up * 12, up * 12, this.hud.tournamentCounter.canvas.width / 2 * up, this.hud.tournamentCounter.canvas.height / 2 * up);
          } else if (this.gameMode === "ragatourney-teams" && this.tournament.team1Tag && this.tournament.team2Tag) {
            this.canvas.drawImage(this.renderTournamentCounterTeams(2), up * 12, up * 12, this.hud.tournamentCounter.canvas.width / 2 * up, this.hud.tournamentCounter.canvas.height / 2 * up);
          }
        }
      }
      window.raga = new u();
      const uq = await fetch(document.getElementById("agario.core.js").getAttribute("path")).then(ur => ur.text()).then(ut => {
        ut = ut.replace(/("\s?registerSkin\s?"\s?:\s?function\s?\(\s?(.+?)\s?,\s?(.+?)\s?,\s?(.+?)\s?,\s?(.+?)\s?,\s?(.+?)\s?\)\s?\{\s?)/i, "$1raga.onRegisterSkin($2,$3,$4,$5,$6);");
        ut = ut.replace(/(;..?\s?\.\s?onopen\s?=\s?function\s?\(\s?\)\s?\{\s?)/i, "$1raga.onConnect();");
        ut = ut.replace(/(\s?if\s?\(\s?window\s?\[\s?"\s?MC\s?"\s?]\s?&&\s?window\s?\[\s?"\s?MC\s?"\s?]\s?\[\s?"\s?onMobileData\s?"\s?]\s?\)\s?window\s?\[\s?"\s?MC\s?"\s?]\s?\[\s?"\s?onMobileData\s?"\s?]\s?\(\s?(.+?)\s?\))/i, "$2=raga.onPacket($2);$1");
        ut = ut.replace(/("\s?setTarget\s?"\s?:\s?function\s?\(\s?(.+?)\s?,\s?(.+?)\s?\)\s?\{\s?)/i, "$1$2=raga.onMouseX($2);$3=raga.onMouseY($3);");
        ut = ut.replace(/("\s?playerZoom\s?"\s?:\s?function\s?\(\s?(.+?)\s?\)\s?\{\s?)/i, "$1$2=raga.onPlayerZoom($2);");
        ut = ut.replace(/(;..?\s?\.\s?onclose\s?=\s?function\s?\(\s?\)\s?\{\s?)/i, "$1raga.onDisconnect(this);");
        ut = ut.replace(/(;..?\s?\.\s?onerror\s?=\s?function\s?\(\s?\)\s?\{\s?)/i, "$1raga.onDisconnect(this);");
        ut = ut.replace(/(,\s?requestAnimationFrame\s?:\s?function\s?\(\s?.+?\s?\)\s?\{\s?)/i, "$1raga.renderLoop();");
        ut = ut.replace(/(\(\s?[a-z|A-Z]{10}\s?\)\s?\.\s?then\s?\(\s?[a-z]{8}\s?\(\s?([a-z]{6})\s?\)\s?\{\s?)/i, "$1const a=new Uint8Array($2,0,19860);const aa=new Uint8Array([32,0,40,2,28,69,4,64,15,11]);const aaa=new Uint8Array($2,19860);const aaaa=new Uint8Array(a.length+aa.length+aaa.length);aaaa.set(a);aaaa.set(aa,a.length);aaaa.set(aaa,a.length+aa.length);aaaa[2476]=224;aaaa[19795]=138;aaaa[221696]=0;aaaa[221697]=0;binary=aaaa.buffer;");
        return ut;
      });
      eval(uq);
    })();

    // core:end
  }
}