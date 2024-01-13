class StrictEqualityExtension {
    getInfo() {
      return {
        id: 'fanbookbot',
        name: 'Fanbook Bot',
        blocks: [
          {
            opcode: 'sztoken',
            blockType: Scratch.BlockType.COMMAND,
            text: '璁剧疆token涓篬ONE]',
            arguments: {
              ONE: {
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'hqtoken',
            blockType: Scratch.BlockType.REPORTER,
            text: '鑾峰彇token',
            arguments: {
            }
          },
          {
            opcode: 'getme',
            blockType: Scratch.BlockType.REPORTER,
            text: '鏈哄櫒浜虹殑[FORMAT]淇℃伅',
            arguments: {
              FORMAT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'XXM_MENU'
              }
            }
          },
          {
            opcode: 'fsxx',
            blockType: Scratch.BlockType.REPORTER,
            text: '鍚戦閬搃d[pdid]鍙戦€佹秷鎭痆text]锛屽苟杩斿洖璇ユ秷鎭痠d',
            arguments: {
              pdid: {
                type: Scratch.ArgumentType.STRING
              },
              text: {
                type: Scratch.ArgumentType.STRING}
            }},
            {
              opcode: 'getmsg',
              blockType: Scratch.BlockType.COMMAND,
              text: '鑾峰彇棰戦亾id[ONE]涓殑鏈€鍚庝竴鏉℃秷鎭�',
              arguments: {
                ONE: {
                  type: Scratch.ArgumentType.STRING
                }
              }
            },
            {
              opcode: 'getmsgtext',
              blockType: Scratch.BlockType.REPORTER,
              text: '娑堟伅鐨勫唴瀹�',
              arguments: {
              }
            },
            {
              opcode: 'getmsgid',
              blockType: Scratch.BlockType.REPORTER,
              text: '娑堟伅鐨刬d',
              arguments: {
              }
            },
            {
              opcode: 'delmsg',
              blockType: Scratch.BlockType.COMMAND,
              text: '鎾ゅ洖棰戦亾id[ONE]涓秷鎭痠d涓篬XXID]鐨勬秷鎭�',
              arguments: {
                ONE: {
                  type: Scratch.ArgumentType.STRING
                },
                XXID: {
                  type: Scratch.ArgumentType.STRING
                }
              }
            }
        ],
        menus: {
          XXM_MENU: {
            acceptReporters: true,
            items: ['鍚嶅瓧', 'id','澶村儚鍥剧墖閾炬帴','user_token','鍘熷json']
        }
      }
      };
    }
    sztoken(args) {
      token = args.ONE;
      //return args.ONE === args.TWO;
      return "鎴愬姛";
    }
    hqtoken(args) {
      return token;
    }
    getme(args) {
      return fetch(`http://1.117.76.68:5000/bot/getme?data=${token}`)
      .then((response) => {
        if (args.FORMAT === '鍘熷json'){
        return response.text();};
        if (args.FORMAT === '鍚嶅瓧'){
          //杩斿洖json涓殑username鍊�
        return response.json().then((data) => {
          return data.result.username;
        })};
        if (args.FORMAT === 'id'){
        return response.json().then((data) => {
          return BigInt(data.result.id);
        })};
        if (args.FORMAT === '澶村儚鍥剧墖閾炬帴'){
        return response.json().then((data) => {
          return data.result.avatar;
        })};
        if (args.FORMAT === 'user_token'){
        return response.json().then((data) => {
          return data.result.user_token;
        })}
      })
      .catch((error) => {
        console.error(error);
        return '鑾峰彇澶辫触';
      });}
      fsxx (args) {
        return fetch(`http://1.117.76.68:5000/bot/sm?token=${token}&chatid=${args.pdid}&text=${args.text}`)
          .then((response) => {
            //杩斿洖杩斿洖鐨勭8涓瓧绗︿互鍚庣殑鍐呭
            return response.text().then((data) => {
              return data.substring(8);})
          })
          .catch((error) => {
            console.error(error);
            return '鑾峰彇澶辫触';
          });
      }
      getmsg (args) {
        return fetch(`http://1.117.76.68:5000/bot/getmsg?token=${token}&pdid=${args.ONE}&type=1`)
          .then((response) => {
            response.json().then((data) => {
            msgdata=data
          })
            return "ok";
          })
          .catch((error) => {
            console.error(error);
            return '鑾峰彇澶辫触';
          });
      }
      getmsgtext (args){
        return msgdata.text;
      }
      getmsgid (args){
        return msgdata.messageid;
      }
      delmsg (args) {
        return fetch(`http://1.117.76.68:5000/bot/delmsg?token=${token}&chatid=${args.ONE}&msgid=${args.XXID}`)
        .then((response) => {
          return response.text();
        })
        .catch((error) => {
          console.error(error);
          return '澶辫触';
        });
      }
  }
  window.token = "";
  window.msgdata="";
  Scratch.extensions.register(new StrictEqualityExtension());
//鐜嬪ぇ鍝� TurboWarp fbbot 鎻掍欢 1.0 2024/1/12 17:20 https://in.fanbook.cn/LmgLJF3N https://github.com/fanbook-wangdage/TurboWarp-fanbook-bot
