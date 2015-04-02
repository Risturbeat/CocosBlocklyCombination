//resize window to max on start
$(window).resize(function() {
    $('#blocklyDiv').css('height', window.innerHeight+'px');
});

//blockly XML code loading
$(document).ready(function(){
    handleXml("toolbox", handleToolBox);
    handleXml("startBlocks", handleStartBlocks);
});

function handleXml(name, callback){
    $.ajax({
        type: "GET",
        url: "xml/" + name + ".xml",
        dataType: "xml",
        complete: callback
    });
}

function handleToolBox(xml) {
    $("#toolboxDiv").html(xml.responseText);
}

function handleStartBlocks(xml){
    $("#startBlocksDiv").html(xml.responseText);

    Blockly.inject(document.getElementById('blocklyDiv'),
        {toolbox: document.getElementById('toolbox')});
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace,
        document.getElementById('startBlocks'));
}

//Blockly button callbacks
function showCode() {
    // Generate JavaScript code and display it.
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    var code = Blockly.JavaScript.workspaceToCode();
    alert("Code: \n" + code);
}

function runCode() {
    // Generate JavaScript code and run it.

    //console.log(msgpack.pack({'test': 'faf'}) + "");
    //console.log(msgpack.unpack(msgpack.pack({'test': 'faf'})) + "");

    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = Blockly.JavaScript.workspaceToCode();
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}

