var config = {"settings":{"lang":"ja","messages":{"intro":"\u300cDay 2 \u30ea\u30c6\u30e9\u30eb\u300dStart\u30dc\u30bf\u30f3\u3092\u30af\u30ea\u30c3\u30af\u3057\u3066\u958b\u59cb\u3057\u3066\u304f\u3060\u3055\u3044\u3002"},"title":"Day 2 \u30ea\u30c6\u30e9\u30eb","shuffle_questions":true,"shuffle_choices":true,"show_correct_answer":false,"show_instant_result":true,"passing_score":100,"movable":false,"sound":true,"theme_internal":"basic_blue"},"questions":[{"question":"Char\u306e\u8aac\u660e\u3068\u3057\u3066\u9593\u9055\u3063\u3066\u3044\u308b\u3082\u306e\u3092\u9078\u3079\u3002","feedback_tf":["Char\u306f\u53c2\u7167\u578b\u3067\u3042\u308a\u300116bit\u56fa\u5b9a\u9577\u306e\u6574\u6570\u578b\u3067\u3059\u3002Scala\u306b\u30d7\u30ea\u30df\u30c6\u30a3\u30d6\u578b\u306f\u5b58\u5728\u3057\u307e\u305b\u3093\u3002Java\u306e\u30d7\u30ea\u30df\u30c6\u30a3\u30d6\u578b\u76f8\u5f53\u306e\u53c2\u7167\u578b\u306fAnyVal\u3001Java\u306e\u53c2\u7167\u578b\u76f8\u5f53\u306e\u53c2\u7167\u578b\u306fAnyRef\u3092\u7d99\u627f\u3057\u3066\u3044\u307e\u3059\u3002","Scala\u306b\u30d7\u30ea\u30df\u30c6\u30a3\u30d6\u578b\u306f\u5b58\u5728\u3057\u307e\u305b\u3093\u3002"],"choice":["\u30d7\u30ea\u30df\u30c6\u30a3\u30d6\u578b","\u53c2\u7167\u578b","\u30af\u30e9\u30b9","\u6574\u6570\u578b"],"answer":["\u30d7\u30ea\u30df\u30c6\u30a3\u30d6\u578b"],"type":"sa","feedback":[false,"Char\u306f\u53c2\u7167\u578b\u3067\u3059\u3002\u53c2\u7167\u578b\u306f\u5168\u3066Any\u30af\u30e9\u30b9\u3092\u7d99\u627f\u3057\u3066\u3044\u307e\u3059\u3002Java\u306e\u53c2\u7167\u578b\u76f8\u5f53\u306e\u30af\u30e9\u30b9\u306fAnyRef\u30af\u30e9\u30b9\u3092\u7d99\u627f\u3057\u3066\u3044\u307e\u3059\u3002","Char\u306f\u30af\u30e9\u30b9\u3067\u3059\u3002Java\u306e\u30d7\u30ea\u30df\u30c6\u30a3\u30d6\u578b\u76f8\u5f53\u306e\u53c2\u7167\u578b\u306fAnyVal\u30af\u30e9\u30b9\u3092\u7d99\u627f\u3057\u3066\u3044\u307e\u3059\u3002","Char\u306f16bit\u56fa\u5b9a\u9577\u306e\u6574\u6570\u578b\u3067\u3059\u3002"]},{"question":"Char\u306e\u5bb9\u91cf\u306f\u4f55bit\u3067\u3059\u304b\u3002","feedback_tf":["Char\u306f16bit\u56fa\u5b9a\u9577\u306e\u6574\u6570\u578b\u3067\u3059\u3002\u3061\u306a\u307f\u306bC\/C++\u306echar\u306f8bit\u56fa\u5b9a\u9577\u3067\u3059\u3002","Char\u306f16bit\u56fa\u5b9a\u9577\u306e\u6574\u6570\u578b\u3067\u3059\u3002"],"choice":["16bit","32bit","21bit","8bit"],"answer":["16bit"],"type":"sa","feedback":[false,"Int\u3084Float\u306f32bit\u3067\u3059\u304c\u3001Char\u3084Short\u306f16bit\u3067\u3059\u3002","Char\u306f16bit\u3067\u3059\u3002\u3061\u306a\u307f\u306bUnicode\u306e\u6587\u5b57\u9818\u57df\u306f21bit\u3067\u3059\u3002","C\/C++\u306echar\u306f8bit\u3067\u3059\u304c\u3001Scala\u306eChar\u306f16bit\u3067\u3059\u3002"]},{"question":"Unicode\u306e\u6587\u5b57\u9818\u57df\u306f\u4f55bit\u3067\u3059\u304b\u3002","feedback_tf":["Unicode\u306e\u6587\u5b57\u9818\u57df\u306f21bit\u3067\u3059\u3002BMP\u9818\u57df\u306f16bit\u3067\u3059\u3002","Unicode\u306e\u6587\u5b57\u9818\u57df\u306f21bit\u3067\u3059\u3002"],"choice":["21bit","16bit","32bit","8bit"],"answer":["21bit"],"type":"sa","feedback":[false,"BMP\u9818\u57df\u306f16bit\u3067\u3059\u304c\u8ffd\u52a0\u9818\u57df\u3092\u542b\u3081\u308b\u306821bit\u3067\u3059\u300216bit=65536\u6587\u5b57\u306e\u5bb9\u91cf\u3067\u306f\u4e2d\u56fd\u30fb\u53f0\u6e7e\u306e\u6f22\u5b57\u3092\u6271\u3046\u306e\u306f\u7121\u7406\u3067\u3059\u3002","\u4e00\u822c\u7684\u306bUnicode\u306eCode Point\u306f32bit\u306eInt\u3067\u6271\u308f\u308c\u307e\u3059\u304c\u3001Unicode\u306e\u6587\u5b57\u9818\u57df\u306f21bit\u3067\u3059\u3002","C\/C++\u306echar\u306f8bit\u3067\u3059\u304c\u3001Unicode\u306e\u6587\u5b57\u9818\u57df\u306f21bit\u3067\u3059\u30028bit=256\u6587\u5b57\u306e\u5bb9\u91cf\u3057\u304b\u306a\u3044\u306e\u3067\u4e16\u754c\u4e2d\u306e\u6587\u5b57\u3092\u6271\u3046\u306e\u306f\u5230\u5e95\u7121\u7406\u3067\u3059\u3002"]},{"question":"\u6b21\u306e\u3046\u3061\u6587\u5b57\u30ea\u30c6\u30e9\u30eb\u3067\u8868\u73fe\u3067\u304d\u306a\u3044\u6587\u5b57\u306f\u3069\u308c\u3067\u3059\u304b\u3002","feedback_tf":["Unicode\u306e\u8ffd\u52a0\u9818\u57df\u306b\u3042\u308b\u6587\u5b57\u306fSurrogate Pair\u3068\u3044\u3046Char\u306e\u5bfe\u3067\u8868\u73fe\u3059\u308b\u305f\u3081Char\uff11\u3064\u3067\u306f\u8868\u73fe\u3067\u304d\u307e\u305b\u3093\u3002Char\uff11\u3064\u3067\u8868\u73fe\u3067\u304d\u306a\u3044\u6587\u5b57\u306f\u6587\u5b57\u30ea\u30c6\u30e9\u30eb\u3067\u66f8\u304f\u3053\u3068\u306f\u3067\u304d\u307e\u305b\u3093\u3002","\u300c\ud842\udfb7\u300d\u306fSurrogate Pair\u3067\u8868\u3059\u305f\u3081\u6587\u5b57\u30ea\u30c6\u30e9\u30eb\u3067\u306f\u8868\u73fe\u3067\u304d\u307e\u305b\u3093\u3002"],"choice":["\u300c\ud842\udfb7\u300d","\u300c\u5f41\u300d","\u300c\u301c\u300d","\u300c\u3007\u300d","\u300c\u5409\u300d","\u300c\u4edd\u300d"],"answer":["\u300c\ud842\udfb7\u300d"],"type":"sa","feedback":[false,"\u300c\u5f41\u300d\u306fBMP\u9818\u57df\u306b\u3042\u308b\u6587\u5b57\u306a\u306e\u3067\u6587\u5b57\u30ea\u30c6\u30e9\u30eb\u3067\u8868\u73fe\u3067\u304d\u307e\u3059\u3002\u3061\u306a\u307f\u306b\u300c\u5f41\u300d\u3084\u300c\u599b\u300d\u306f\u5e7d\u970a\u6587\u5b57\u3067\u3059\u3002","\u300c\u301c\u300d\u306fBMP\u9818\u57df\u306b\u3042\u308b\u6587\u5b57\u306a\u306e\u3067\u6587\u5b57\u30ea\u30c6\u30e9\u30eb\u3067\u8868\u73fe\u3067\u304d\u307e\u3059\u3002\u3061\u306a\u307f\u306b\u6ce2\u30c0\u30c3\u30b7\u30e5\u3068\u5168\u89d2\u30c1\u30eb\u30c0\u306fUnicode\u4e0a\u5225\u306eCode Point\u306b\u305d\u308c\u305e\u308c\u5b58\u5728\u3057\u307e\u3059\u3002","\u300c\u3007\u300d\u306fBMP\u9818\u57df\u306b\u3042\u308b\u6587\u5b57\u306a\u306e\u3067\u6587\u5b57\u30ea\u30c6\u30e9\u30eb\u3067\u8868\u73fe\u3067\u304d\u307e\u3059\u3002\u3061\u306a\u307f\u306b\u6f22\u6570\u5b57\u306e\u30bc\u30ed\u306f\u300c\u96f6\u300d\u3068\u300c\u3007\u300d\u306e\uff12\u7a2e\u985e\u5b58\u5728\u3057\u307e\u3059\u3002","\u300c\u5409\u300d\u306fBMP\u9818\u57df\u306b\u3042\u308b\u6587\u5b57\u306a\u306e\u3067\u6587\u5b57\u30ea\u30c6\u30e9\u30eb\u3067\u8868\u73fe\u3067\u304d\u307e\u3059\u3002\u3061\u306a\u307f\u306b\u300c\u5409\u300d\u306f\u6709\u540d\u306a\u725b\u4e3c\u5c4b\u306e\u982d\u6587\u5b57\u3067\u306f\u306a\u3044\u3067\u3059\u3002","\u300c\u4edd\u300d\u306fBMP\u9818\u57df\u306b\u3042\u308b\u6587\u5b57\u306a\u306e\u3067\u6587\u5b57\u30ea\u30c6\u30e9\u30eb\u3067\u8868\u73fe\u3067\u304d\u307e\u3059\u3002\u3061\u306a\u307f\u306b\u300c\u4edd\u300d\u3084\u300c\u3003\u300d\u306f\u540c\u4e0a\u8a18\u53f7\u3067\u3059\u3002"]},{"question":"String\u306e\u6587\u5b57\u30b3\u30fc\u30c9\u306f\u3069\u308c\u3067\u3059\u304b\u3002","feedback_tf":["String\u306e\u6587\u5b57\u30b3\u30fc\u30c9\u306fUTF-16BE\u3067\u3059\u3002Char\u306f16bit\u3067String\u304cChar\u914d\u5217\u306e\u30e9\u30c3\u30d1\u30fc\u30af\u30e9\u30b9\u3067\u3059\u3002JVM\u306f\u6587\u5b57\u5217\u3092Big Endian\u3067\u6271\u3044\u307e\u3059\u3002","String\u306e\u6587\u5b57\u30b3\u30fc\u30c9\u306fUTF-16BE\u3067\u3059\u3002"],"choice":["UTF-16BE","UTF-16LE","UTF-8","UTF-32LE","UTF-32BE","windows-31j"],"answer":["UTF-16BE"],"type":"sa","feedback":[false,"JVM\u306f\u6587\u5b57\u5217\u3092Big Endian\u3067\u6271\u3044\u307e\u3059\u3002","\u4e00\u822c\u7684\u306bUTF-8\u306e\u3088\u3046\u306a\u53ef\u5909\u9577\u306a\u7b26\u53f7\u5316\u306f\u30e1\u30e2\u30ea\u4e0a\u3067\u64cd\u4f5c\u3059\u308b\u6587\u5b57\u5217\u306b\u306f\u7528\u3044\u305a\u3001\u30b9\u30c8\u30ec\u30fc\u30b8\u306b\u8a18\u61b6\u3055\u305b\u308b\u3068\u304d\u306b\u4f7f\u308f\u308c\u307e\u3059\u3002","Char\u306f16bit\u3067String\u306fChar\u914d\u5217\u306e\u30e9\u30c3\u30d1\u30fc\u30af\u30e9\u30b9\u3067\u3059\u3002JVM\u306f\u6587\u5b57\u5217\u3092Big Endian\u3067\u6271\u3044\u307e\u3059\u3002","Char\u306f16bit\u3067String\u306fChar\u914d\u5217\u306e\u30e9\u30c3\u30d1\u30fc\u30af\u30e9\u30b9\u3067\u3059\u3002","String\u3084Char\u304c\u7528\u3044\u308b\u6587\u5b57\u96c6\u5408\u306fUnicode\u3067\u3059\u3002"]},{"question":"Unicode\u306eCode Point\u306e\u6587\u5b57\u30b3\u30fc\u30c9\u306f\u3069\u308c\u3067\u3059\u304b\u3002","feedback_tf":["Code Point\u306e\u6587\u5b57\u30b3\u30fc\u30c9\u306fUTF-32BE\u3067\u3001\u4e00\u822c\u7684\u306b32bit\u306eInt\u3067\u6271\u3044\u307e\u3059\u304c\u3001Code Point\u305d\u306e\u3082\u306e\u306e\u5bb9\u91cf\u306f21bit\u3067\u3059\u3002","Code Point\u306e\u6587\u5b57\u30b3\u30fc\u30c9\u306fUTF-32BE\u3067\u3059\u3002"],"choice":["UTF-32BE","UTF-16LE","UTF-8","UTF-32LE","UTF-16BE","windows-31j"],"answer":["UTF-32BE"],"type":"sa","feedback":[false,"","","","","Unicode\u306eCode Point\u306b\u3064\u3044\u3066\u306e\u554f\u984c\u306a\u306e\u3067\u3001\u305d\u3082\u305d\u3082Unicode\u3067\u306f\u306a\u3044windows-31j\u306f\u9055\u3044\u307e\u3059\u3002"]},{"question":"String\u306b\u5b58\u5728\u3057\u306a\u3044\u30a8\u30b9\u30b1\u30fc\u30d7\u30b7\u30fc\u30b1\u30f3\u30b9\u306f\u3069\u308c\u3067\u3059\u304b\u3002","feedback_tf":["8\u9032\u6570\u306e\u30a8\u30b9\u30b1\u30fc\u30d7\u30b7\u30fc\u30b1\u30f3\u30b9\u306f0\u3092\u8868\u3059\\000\u304b\u3089255\u3092\u8868\u3059\\377\u307e\u3067\u5b58\u5728\u3057\u307e\u3059\u3002\\400\u306f\u5b58\u5728\u3057\u307e\u305b\u3093\u3002\u3061\u306a\u307f\u306bInt\u578b\u306e8\u9032\u6570\u30ea\u30c6\u30e9\u30eb\u306f2.10\u3067deprecated\u306b\u306a\u308a\u307e\u3057\u305f\u3002","8\u9032\u6570\u306e\u30a8\u30b9\u30b1\u30fc\u30d7\u30b7\u30fc\u30b1\u30f3\u30b9\u306f0\u3092\u8868\u3059\\000\u304b\u3089255\u3092\u8868\u3059\\377\u307e\u3067\u5b58\u5728\u3057\u307e\u3059\u3002\\400\u306f\u5b58\u5728\u3057\u307e\u305b\u3093\u3002"],"choice":["\\400","\\f","\\000","\\b","\\t","\\n"],"answer":["\\400"],"type":"sa","feedback":[false,"\u6539\u30da\u30fc\u30b8\uff08Form Feed\uff09\u3092\u8868\u3059\u30a8\u30b9\u30b1\u30fc\u30d7\u30b7\u30fc\u30a8\u30f3\u30b9\u3067\u3059\u3002","8\u9032\u6570\u30670\u3092\u8868\u3059\u30a8\u30b9\u30b1\u30fc\u30d7\u30b7\u30fc\u30a8\u30f3\u30b9\u3067\u3059\u3002","\u30d0\u30c3\u30af\u30b9\u30da\u30fc\u30b9\uff08Back Space\uff09\u3092\u8868\u3059\u30a8\u30b9\u30b1\u30fc\u30d7\u30b7\u30fc\u30b1\u30f3\u30b9\u3067\u3059\u3002","\u6c34\u5e73\u30bf\u30d6\uff08Horizonrtal Tab\uff09\u3092\u8868\u3059\u30a8\u30b9\u30b1\u30fc\u30d7\u30b7\u30fc\u30b1\u30f3\u30b9\u3067\u3059\u3002","\u6539\u884c\uff08New Line\uff09\u3092\u8868\u3059\u30a8\u30b9\u30b1\u30fc\u30d7\u30b7\u30fc\u30b1\u30f3\u30b9\u3067\u3059\u3002"]},{"question":"\u30b7\u30e7\u30fc\u30f3\u30fb\u30b3\u30cd\u30ea\u30fc\u304c\u51fa\u6f14\u3057\u3066\u3044\u306a\u3044\u6620\u753b\u306f\u3069\u308c\u3067\u3059\u304b\u3002","feedback_tf":["\u300c\u30b7\u30a7\u30eb\u30d6\u30fc\u30eb\u306e\u96e8\u5098\u300d\u306f1964\u5e74\u516c\u958b\u306e\u30d5\u30e9\u30f3\u30b9\u306e\u30df\u30e5\u30fc\u30b8\u30ab\u30eb\u6620\u753b\u3067\u3059\u3002","\u300c\u30b7\u30a7\u30eb\u30d6\u30fc\u30eb\u306e\u96e8\u5098\u300d\u306f1964\u5e74\u516c\u958b\u306e\u30d5\u30e9\u30f3\u30b9\u306e\u30df\u30e5\u30fc\u30b8\u30ab\u30eb\u6620\u753b\u3067\u3001\u30b7\u30e7\u30fc\u30f3\u30fb\u30b3\u30cd\u30ea\u30fc\u306f\u51fa\u6f14\u3057\u3066\u3044\u307e\u305b\u3093\u3002"],"choice":["\"\u30b7\u30a7\u30eb\u30d6\u30fc\u30eb\u306e\u96e8\u5098\"","f\"${2+5}%3d \u30ed\u30b7\u30a2\u3088\u308a\u611b\u3092\u3053\u3081\u3066\"","s\"\"\"\u30cf\u30a4\u30e9\u30f3\u30c0\u30fc${1*2} \u7526\u308b\u6226\u58eb\"\"\"","\"\u5c0f\u8aac\u5bb6\u3092\u898b\u3064\u3051\u305f\u3089\"","\"\"\"\u30e9\u30a4\u30b8\u30f3\u30b0\\u30FB\u30b5\u30f3\"\"\"","raw\"\u30a4\u30f3\u30c7\u30a3\u30fb\u30b8\u30e7\u30fc\u30f3\u30ba\/\u6700\u5f8c\u306e\u8056\u6226\""],"answer":["\"\u30b7\u30a7\u30eb\u30d6\u30fc\u30eb\u306e\u96e8\u5098\""],"type":"sa","feedback":[false,"1965\u5e74\u516c\u958b\u306e\u6620\u753b\u300c007 \u30ed\u30b7\u30a2\u3088\u308a\u611b\u3092\u3053\u3081\u3066\u300d\u3067\u30b7\u30e7\u30fc\u30f3\u30fb\u30b3\u30cd\u30ea\u30fc\u306f\u524d\u4f5c\u306e007\u30b7\u30ea\u30fc\u30ba\u7b2c1\u4f5c\u306b\u5f15\u304d\u7d9a\u304d\u4e3b\u6f14\u306e\u30b8\u30a7\u30fc\u30e0\u30ba\u30fb\u30dc\u30f3\u30c9\u3092\u6f14\u3058\u307e\u3057\u305f\u3002","1991\u5e74\u516c\u958b\u306e\u6620\u753b\u300c\u30cf\u30a4\u30e9\u30f3\u30c0\u30fc2 \u7526\u308b\u6226\u58eb\u300d\u3067\u30b7\u30e7\u30fc\u30f3\u30fb\u30b3\u30cd\u30ea\u30fc\u306f\u7526\u308b\u6226\u58eb\u30e9\u30df\u30ec\u30b9\u3092\u6f14\u3058\u307e\u3057\u305f\u3002","2000\u5e74\u516c\u958b\u306e\u6620\u753b\u300c\u5c0f\u8aac\u5bb6\u3092\u898b\u3064\u3051\u305f\u3089\u300d\u3067\u30b7\u30e7\u30fc\u30f3\u30fb\u30b3\u30cd\u30ea\u30fc\u306f\u5c0f\u8aac\u5bb6\u306e\u624d\u80fd\u3092\u6301\u3064\u30b8\u30e3\u30de\u30fc\u30eb\u5c11\u5e74\u3092\u898b\u3064\u3051\u308b\u96a0\u9041\u5c0f\u8aac\u5bb6\u30d5\u30a9\u30ec\u30b9\u30bf\u30fc\u3092\u6f14\u3058\u307e\u3057\u305f\u3002","1993\u5e74\u516c\u958b\u306e\u65e5\u672c\u4f01\u696d\u306b\u3088\u308b\u30a2\u30e1\u30ea\u30ab\u4f01\u696d\u306e\u8cb7\u53ce\u306b\u8b66\u9418\u3092\u9cf4\u3089\u3059\u76ee\u7684\u304c\u3042\u3063\u305f\u306e\u304b\u3088\u304f\u5206\u304b\u3089\u306a\u3044\u6620\u753b\u300c\u30e9\u30a4\u30b8\u30f3\u30b0\u30fb\u30b5\u30f3\u300d\u3067\u30b7\u30e7\u30fc\u30f3\u30fb\u30b3\u30cd\u30ea\u30fc\u306f\u30b8\u30e7\u30f3\u30fb\u30b3\u30ca\u30fc\u8b66\u90e8\u3092\u6f14\u3058\u307e\u3057\u305f\u3002","\u30a4\u30f3\u30c7\u30a3\u30fb\u30b8\u30e7\u30fc\u30f3\u30ba \u30b7\u30ea\u30fc\u30ba\u306e\u7b2c3\u4f5c\u76ee\u3068\u306a\u308b1989\u5e74\u516c\u958b\u306e\u6620\u753b\u300c\u30a4\u30f3\u30c7\u30a3\u30fb\u30b8\u30e7\u30fc\u30f3\u30ba\/\u6700\u5f8c\u306e\u8056\u6226\u300d\u3067\u30b7\u30e7\u30fc\u30f3\u30fb\u30b3\u30cd\u30ea\u30fc\u306f\u30a4\u30f3\u30c7\u30a3\u306e\u7236\u30d8\u30f3\u30ea\u30fc\u30fb\u30b8\u30e7\u30fc\u30f3\u30ba\u6559\u6388\u3092\u6f14\u3058\u307e\u3057\u305f\u3002"]},{"question":"OS\u306b\u975e\u4f9d\u5b58\u306a\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u3084\u30d5\u30a1\u30a4\u30eb\u306e\u30d1\u30b9\u306e\u533a\u5207\u308a\u6587\u5b57\u306f\u3069\u308c\u3067\u3059\u304b\u3002","feedback_tf":["OS\u306b\u975e\u4f9d\u5b58\u306a\u30d1\u30b9\u306e\u533a\u5207\u308a\u6587\u5b57\u306fFile.separator\u3067\u3059\u3002System.getProperty(\"file.separator\")\u3067\u3082\u53d6\u5f97\u3067\u304d\u307e\u3059\u3002","OS\u306b\u975e\u4f9d\u5b58\u306a\u30d1\u30b9\u306e\u533a\u5207\u308a\u6587\u5b57\u306fFile.separator\u3067\u3059\u3002"],"choice":["File.separator","System.separator","File.lineSeparator","System.lineSeparator","File.pathSeparator","System.pathSeparator"],"answer":["File.separator"],"type":"sa","feedback":[false,"System.separator\u306f\u5b58\u5728\u3057\u307e\u305b\u3093\u3002File.separator\u306fOS\u306b\u975e\u4f9d\u5b58\u306a\u30d1\u30b9\u306e\u533a\u5207\u308a\u6587\u5b57\u3067\u3059\u3002","File.lineSeparator\u306f\u5b58\u5728\u3057\u307e\u305b\u3093\u3002System.lineSeparator\u306fOS\u306b\u975e\u4f9d\u5b58\u306a\u6539\u884c\u6587\u5b57\u3067\u3059\u3002","System.lineSeparator\u306fOS\u306b\u975e\u4f9d\u5b58\u306a\u6539\u884c\u6587\u5b57\u3067\u3059\u3002","File.pathSeparator\u306fOS\u306b\u975e\u4f9d\u5b58\u306a\u30af\u30e9\u30b9\u30d1\u30b9\u306e\u533a\u5207\u308a\u6587\u5b57\u3067\u3059\u3002","System.pathSeparator\u306f\u5b58\u5728\u3057\u307e\u305b\u3093\u3002File.pathSeparator\u306fOS\u306b\u975e\u4f9d\u5b58\u306a\u30af\u30e9\u30b9\u30d1\u30b9\u306e\u533a\u5207\u308a\u6587\u5b57\u3067\u3059\u3002"]},{"question":"OS\u306b\u975e\u4f9d\u5b58\u306a\u30af\u30e9\u30b9\u30d1\u30b9\u306e\u533a\u5207\u308a\u6587\u5b57\u306f\u3069\u308c\u3067\u3059\u304b\u3002","feedback_tf":["OS\u306b\u975e\u4f9d\u5b58\u306a\u30af\u30e9\u30b9\u30d1\u30b9\u306e\u533a\u5207\u308a\u6587\u5b57\u306fSystem.getProperty(\"path.separator\")\u3067\u3059\u3002File.pathSeparator\u3067\u3082\u53d6\u5f97\u3067\u304d\u307e\u3059\u3002","OS\u306b\u975e\u4f9d\u5b58\u306a\u30af\u30e9\u30b9\u30d1\u30b9\u306e\u533a\u5207\u308a\u6587\u5b57\u306fSystem.getProperty(\"path.separator\")\u3067\u3059\u3002"],"choice":["System.getProperty(\"path.separator\")","System.getProperty(\"file.separator\")","System.getProperty(\"line.separator\")","String.format(\"%n\")"],"answer":["System.getProperty(\"path.separator\")"],"type":"sa","feedback":[false,"System.getProperty(\"file.separator\")\u306fOS\u306b\u975e\u4f9d\u5b58\u306a\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u3084\u30d5\u30a1\u30a4\u30eb\u306e\u30d1\u30b9\u306e\u533a\u5207\u308a\u6587\u5b57\u3067\u3059\u3002","System.getProperty(\"line.separator\")\u306fOS\u306b\u975e\u4f9d\u5b58\u306a\u6539\u884c\u6587\u5b57\u3067\u3059\u3002","String.format(\"%n\")\u306fOS\u306b\u975e\u4f9d\u5b58\u306a\u6539\u884c\u6587\u5b57\u3067\u3059\u3002"]}]}