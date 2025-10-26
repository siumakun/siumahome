document.write(`
    <style>
        @import url('https://fonts.googleapis.com/css2?family=UoqMunThenKhung&display=swap');
        *{font-family: "UoqMunThenKhung", sans-serif; font-weight: 500; font-style: normal;}
        .title {margin-right: auto; position: relative; left: calc(50% - 50px);}
        .logo{height: 50px; border-radius: 10px; box-shadow: 0px 0px 15px -5px #3f3f3f;}
        .menu-item {list-style: none; display: inline-block; padding: 10px;}
        .drawer_hidden {display: none;}
        .drawer_open {display: flex; height: 60px; width: 60px; justify-content: center; align-items: center;position: relative;z-index: 100;cursor: pointer;}
        .drawer_open span, .drawer_open span:before, .drawer_open span:after {content: '';display: block;height: 3px;width: 25px;border-radius: 3px;background: #333;transition: 0.5s;position: absolute;}
        .drawer_open span:before {bottom: 8px;}
        .drawer_open span:after {top: 8px;}
        #drawer_input:checked ~ .drawer_open span {background: rgba(255, 255, 255, 0);}
        #drawer_input:checked ~ .drawer_open span::before {bottom: 0;transform: rotate(45deg);}
        #drawer_input:checked ~ .drawer_open span::after {top: 0;transform: rotate(-45deg);}
        .nav_content {width: 100%;height: 100%;position: fixed;top: 0; left: 100%;  z-index: 99;background: #fff; transition: .5s;}
        .nav_list {list-style: none;}
        header{box-shadow: 0px 10px 14px 0px rgba(0, 0, 0, 0.57);position: sticky;top: 0; background-color: rgba(255, 255, 255, 0.700);display: flex; height: 100px;align-items: center;width: 100%;}
        #drawer_input:checked ~ .nav_content {left: 0;/* メニューを画面に入れる */}
        .s_link_mother{position: relative; top: calc( 100vh - 250px );}
        #menu-text{position: relative;bottom: 17px;}
        .h_text{font-size:25px; margin: 10px;}
        @media screen and (min-width: 1625px) {
            .hamburger{display: none;}
        }
        @media screen and (max-width: 1625px) {
            .nav{display:none;}
        }
        @media (prefers-color-scheme: dark) {
            .drawer_open span, .drawer_open span:before, .drawer_open span:after{background: rgb(236, 236, 236);}
            .nav_content{background:rgb(0,0,0);}
            .h_text{color: white;}
            header{background-color: rgba(0, 0, 0, 0.7); }
            .header_link{color: white;}
        }
    </style>
    <header>
        <a class="title" href="/"><img class="top_logo" src="/img/logo.svg" alt="しうま"></a>
    <nav class="nav">
        <ul class="menu-group">
            <li class="menu-item" id="menu-text"><a class="header_link" href="/edit">制作したもの</a></li>
            <li class="menu-item" id="menu-text"><a class="header_link" href="/guidline">創作物使用ガイドライン</a></li>
            <li class="menu-item" id="menu-text"><a class="header_link" href="/form">連絡･お問い合わせ</a></li>
            <li class="menu-item"><a class="header_link" href="https://x.com/siuma_3D"><img class="logo" src="/img/x_logo.png" alt="X"></a></li>
            <li class="menu-item"><a class="header_link" href="https://www.youtube.com/@%E3%81%97%E3%81%86%E3%81%BE%E3%81%8F%E3%82%93"><img class="logo" src="/img/youtube_logo.png" alt="youtube"></a></li>
            <li class="menu-item"><a class="header_link" href="https://www.nicovideo.jp/user/129942301"><img class="logo" src="/img/niconico_logo.png" alt="niconico"></a></li>
            <li class="menu-item"><a class="header_link" href="https://siuma.booth.pm/"><img class="logo" src="/img/logo_icon.png" alt="Booth"></a></li>
        </ul>
    </nav>
    <div class="hamburger">
    
        <input id="drawer_input" class="drawer_hidden" type="checkbox">
        <label for="drawer_input" class="drawer_open"><span></span></label>
        <nav class="nav_content">
            <ul class="nav_list">
                <li class="nav_item"><a class="h_text" href="/edit">制作したもの</a></li>
                <li class="nav_item"><a class="h_text" href="/guidline">創作物使用ガイドライン</a></li>
                <li class="nav_item"><a class="h_text" href="/form">連絡･お問い合わせ</a></li>
            </ul>
            <div class="s_link_mother">
                <div class="s_link"><a title="X(旧Twitter)" href="https://x.com/siuma_3D" target="_blank"><img class="logo" src="/img/x_logo.png" alt="X"></a></div>
                <div class="s_link"><a title="YouTube" href="https://www.youtube.com/@%E3%81%97%E3%81%86%E3%81%BE%E3%81%8F%E3%82%93" target="_blank"><img class="logo" src="/img/youtube_logo.png" alt="youtube"></a></div>
                <div class="s_link"><a title="ニコニコ動画" href="https://www.nicovideo.jp/user/129942301" target="_blank"><img class="logo" src="/img/niconico_logo.png" alt="niconico"></a></div>
                <div class="s_link"><a title="Booth" href="https://siuma.booth.pm/" target="_blank"><img class="logo" src="/img/logo_icon.png" alt="Booth"></a></div>
            </div>
        </nav>
   
      </div>
    </header>`);