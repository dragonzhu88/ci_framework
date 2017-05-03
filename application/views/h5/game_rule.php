<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>全网通营销管理后台-移动版</title>
    <link rel="stylesheet" type="text/css" href="/static/js/layout/themes/bootstrap/easyui.css">
    <link rel="stylesheet" type="text/css" href="/static/js/layout/themes/mobile.css">
    <link rel="stylesheet" type="text/css" href="/static/js/layout/themes/icon.css">
    <script type="text/javascript" src="/static/js/jquery.min.js"></script>
    <script type="text/javascript" src="/static/js/layout/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="/static/js/layout/jquery.easyui.mobile.js"></script>
    <script type="text/javascript" src="/static/js/layout/locale/easyui-lang-zh_CN.js"></script>
</head>
<body>

<div class="easyui-navpanel warp">
    <div class="main">
        <p class="introduction"> <?php echo $data['introduction'];?></p>
        <?php foreach ($data['rows'] as $key => $contents):?>
            <p class="title"> <?php echo $key;?> </p>
            <?php foreach ($contents as $content):?>
                <p class="content"> <?php echo $content;?> </p>
            <?php endforeach;?>
        <?php endforeach;?>
    </div>
</div>

<style>
    .warp{
        background: #F5F5F9;
    }

    .main{
        background: #FFFFFF;
        border-radius: 10pt;
        margin: 5pt;
        padding: 10pt;
    }

    .title{
        font-family: .PingFang-SC-Regular;
        color: #ff0000;
        font-size: 15pt;
        text-decoration: underline;
    }

    .introduction {
        font-family: .PingFang-SC-Regular;
        color: #353535;
        font-size: 13pt;
        letter-spacing: 0;
    }

    .content {
        font-family: .PingFang-SC-Regular;
        color: #353535;
        font-size: 13pt;
        letter-spacing: 0;
    }

</style>


</body>
</html>
<script>

</script>