onmessage = function( e )
{
    var xmlTextArray;
    var xmlCDataArray;
    var xmlAttrArray;

    importScripts( 'xmlsax.js', 'scripts.js' );
    
    var ixml = e.data;

    var ret = {
        data: [],
        xml : [],
        cdata : [],
        attrs : [],
        results : [],
        errs : []
    };

    var parser = new SAXDriver();
    var handler = new xmlHandler();

    // pass handlers to the sax2 parser
    parser.setDocumentHandler(handler);
    parser.setErrorHandler(handler);
    parser.setLexicalHandler(handler);

    parser.parse(ixml);// start parsing

    var old_e = e.data.substring(0,5);
    
    ret.xml.push( old_e );

    // get errors from sax2 parser
    ret.errs.push( handler.getError() );
    ret.results.push( handler.getText_Array() );
    ret.cdata.push( handler.getCDATA_Array() );
    ret.attrs.push( handler.getAttr_Array() );

    var arr = handler.getPath_Array();

    for (i=0;i<arr.length;i++){
        ret.data.push( arr[i] );
    }
    
    postMessage( ret );

};
