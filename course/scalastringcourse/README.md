# １週間で学ぶScalaの文字列処理
Scalaの文字列処理についてDay 1からDay 7までの１週間で学習します。本教材を使った学習方法について説明します。  

1. まずは、本リポジトリのsrc/testの下にあるサンプルコードを実行して挙動を確認してください。
2. 次に、Indexにある各Dayの資料を読んで理解を深めてください。各Dayごとに短くまとめた動画と詳細に書いた読み物が用意されています。資料を読んだ後はQuizに挑戦してください。Day 1を除く各Dayごとに10問あります。満点で合格です。何度でも挑戦可能です。
3. 全DayのQuizに合格したらFinal Quizに挑戦してください。Final Quizは100問あります。満点で合格です。こちらも何度でも挑戦可能です。ここまでで１週間分の内容です。
4. 最後に、学習したことの応用としてテキストからの情報抽出のTaskを用意します。  
Taskでは、トレーニングデータ、テストデータ、ベースラインシステムと自動評価器を提供します。  
是非、ベースラインシステムを上回る評価値を目指して挑戦してみてください。
***
<h2>目次</h2>
<a href="https://github.com/ynupc/scalastringcourseday1" target="_blank">Day 1 概要と環境設定</a>  
<a href="https://github.com/ynupc/scalastringcourseday2" target="_blank">Day 2 リテラル・補間子・特殊な文字</a>  
<a href="https://github.com/ynupc/scalastringcourseday3" target="_blank">Day 3 コードポイントとサロゲートペア</a>  
<a href="https://github.com/ynupc/scalastringcourseday4" target="_blank">Day 4 Stringの文字コード変換と数値型との相互変換</a>  
<a href="https://github.com/ynupc/scalastringcourseday5" target="_blank">Day 5 ミュータビリティとフォーマット</a>  
<a href="https://github.com/ynupc/scalastringcourseday6" target="_blank">Day 6 正規表現と文字列操作</a>  
<a href="https://github.com/ynupc/scalastringcourseday7" target="_blank">Day 7 文字の正規化とオプション</a>  
***
<h2>Quiz</h2>
<a href="http://ynupc.github.io/quiz/scalastringcourse/day2/" target="_blank">Day 2 リテラル・補間子・特殊な文字 (全１０問)</a>  
<a href="http://ynupc.github.io/quiz/scalastringcourse/day3/" target="_blank">Day 3 Code PointとSurrogate Pair (全１０問)</a>  
<a href="http://ynupc.github.io/quiz/scalastringcourse/day4/" target="_blank">Day 4 Stringの文字コード変換と数値型との相互変換 (全１０問)</a>  
<a href="http://ynupc.github.io/quiz/scalastringcourse/day5/" target="_blank">Day 5 ミュータビリティとフォーマット (全１０問)</a>  
<a href="http://ynupc.github.io/quiz/scalastringcourse/day6/" target="_blank">Day 6 正規表現と文字列操作 (全１０問)</a>  
<a href="http://ynupc.github.io/quiz/scalastringcourse/day7/" target="_blank">Day 7 文字の正規化とオプション (全１０問)</a>  
<a href="http://ynupc.github.io/quiz/scalastringcourse/final/" target="_blank">Final Quiz (全１００問)</a>
***
<h2>Task</h2>
***
<h2>Detailed Index</h2>
<h3>Day 1 Overview</h3>  

<strong>1.　概要</strong>  
<strong>2.　環境設定</strong>  
<strong>2.1　Java, Scala and Scala XML</strong>  
コラム：API  
コラム：Style  
<strong>2.2　SBT, JUnit and ScalaTest</strong>  
コラム：IDE  
コラム：サンプルコードの文字コード  
***
<h3>Day 2 リテラル・補間子・特殊な文字</h3>  

<strong>1.　リテラルとは</strong>  
コラム：非ヒープ領域によるOutOfMemoryError  
コラム：OutOfMemoryErrorやStackOverflowErrorの対処法  
（１）プログラム上で使用するメモリ容量を減らす  
（２）物理的に割り当てる容量を変更する  
<strong>1.1　文字に関するリテラル</strong>  
コラム：なぜ１文字が１つのchar型で表せなくなったのか、文字コードの歴史  
<strong>1.2　文字に関するリテラルの例</strong>  
コラム：Scalaのvalとvarの使い分け  
コラム：日本語の半角円記号とバックスラッシュ記号の混同問題  
<strong>1.3　生文字リテラル</strong>  
コラム：文字列の一致  
コラム：文字の一致  
<strong>1.4　生文字リテラルの改行のインデントを揃える方法</strong>  

<strong>2.　補間子</strong>  
<strong>2.1　s補間子</strong>  
<strong>2.2　f補間子</strong>  
<strong>2.3　raw補間子</strong>  
<strong>2.4　文字列リテラル＋raw補間子と生文字リテラルの違い</strong>  
<strong>2.5　補間子の自作</strong>  

<strong>3.　特殊な文字</strong>  
<strong>3.1　エスケープシーケンス</strong>  
<strong>3.2　Unicodeシーケンス</strong>  
コラム：幽霊文字  
コラム：波ダッシュと全角チルダの問題  
<strong>3.3　OS依存文字</strong>  
***
<h3>Day 3 コードポイントとサロゲートペア</h3>  

<strong>1.　コードポイントとサロゲートペアの理論</strong>  
<strong>1.1　コードポイント</strong>  
コラム：BOMとエンディアン  
コラム：UTF-8のBOMを削除する方法  
（１）VimによるUTF-8のBOMの手動削除  
（２）ScalaによるUTF-8のBOMの自動削除  
コラム：UTF-8のセキュリティ問題、Nimda  
コラム：UTF-8のテキストのMySQLへの保存、utf8mb4  
<strong>1.2　サロゲートペア</strong>    
<strong>1.3　コードポイントとサロゲートペアの相互変換式</strong>  

<strong>2.　コードポイントとサロゲートペアの実装</strong>  
<strong>2.1　サロゲートペア (Array[Char])とコードポイント (Int)の相互変換</strong>  
<strong>2.1.1　サロゲートペア (Array[Char])からコードポイント (Int)への変換</strong>  
<strong>2.1.2　コードポイント (Int)からサロゲートペア (Array[Char])への変換</strong>  
<strong>2.2　コードポイント (Int)からChar数 (Int)の取得</strong>  
<strong>2.3　コードポイント (Int)から上位サロゲート (Char)や下位サロゲート (Char)の取得</strong>  
<strong>2.3.1　コードポイント (Int)から上位サロゲート (Char)の取得</strong>  
<strong>2.3.2　コードポイント (Int)から下位サロゲート (Char)の取得</strong>  
<strong>2.4　CharSequenceやStringやChar配列 (Array[Char])からコードポイント (Int)の取得</a></strong>  
<strong>2.4.1　指定インデックス (Int)にある文字のコードポイント (Int)の取得</strong>  
<strong>2.4.2　順方向に解析しコードポイント (Int)を取得</strong>  
<strong>2.4.3　逆方向に解析しコードポイント (Int)を取得</strong>  
<strong>2.4.4　サロゲートペアに対する挙動</strong>  
<strong>2.5　CharSequenceとStringの相互変換</strong>  
<strong>2.5.1　StringからCharSequenceへの変換</strong>  
<strong>2.5.2　CharSequenceからStringへの変換</strong>  
<strong>2.6　CharSequenceやStringとChar配列 (Array[Char])の相互変換</strong>  
<strong>2.6.1　CharSequenceからChar配列 (Array[Char])への変換</strong>  
<strong>2.6.2　StringからChar配列 (Array[Char])への変換</strong>  
<strong>2.6.3　Char配列 (Array[Char])からStringへの変換</strong>  
<strong>2.7　StringからChar数 (IntまたはLong)やコードポイント数 (IntまたはLong)の取得</strong>  
<strong>2.7.1　StringからChar数 (IntまたはLong)の取得</strong>  
<strong>2.7.2　Stringからコードポイント数 (IntまたはLong)の取得</strong>  
<strong>2.8　CharSequenceやStringとコードポイント配列 (Array[Int])の相互変換</strong>  
<strong>2.8.1　コードポイント配列 (Array[Int])からStringへの変換</strong>  
<strong>2.8.2　CharSequenceやStringからコードポイント配列 (Array[Int])への変換</strong>  
<strong>2.9　コードポイント数 (Int)だけ移動した位置のインデックス (Int)の取得</strong>  
<strong>2.10　Stringからイテレータの生成</strong>  
<strong>2.10.1　StringCharacterIteratorによるChar単位のイテレータ</strong>  
<strong>2.10.2　IntStreamによるChar単位のイテレータ</strong>  
<strong>2.10.3　IntStreamによるコードポイント単位のイテレータ</strong>  
<strong>2.11　コードポイントとサロゲートペアに関する特に重要な変換</strong>  
<strong>2.12　Java 7以前のStringからコードポイント配列 (Array[Int])への変換</strong>
***
<h3>Day 4 Stringの文字コード変換と数値型との相互変換</h3>  

<strong>1.　Stringの文字コード変換</strong>  
<strong>1.1　Charsetの正式名称（Canonical Name）とエイリアス</strong>  
<strong>1.2　文字コードの変換</strong>  
コラム：Windowsのコマンドプロンプトの文字コード変更  
コラム：MalformedInputExceptionとUnmappableCharacterExceptionの回避方法  

<strong>2.　Stringと数値型の相互変換</strong>  
コラム：JavaでのStringとプリミティブ型の相互変換  
（１）widening primitive conversion  
（２）narrowing primitive conversion  
（３）プリミティブラッパークラス  
（４）auto-boxing conversion  
（５）auto-unboxing conversion  
（６）プリミティブ型からStringへの変換  
（７）Stringからプリミティブ型への変換  
コラム：検査例外と非検査例外  
<strong>2.1　JavaのBooleanラッパークラスのparseBooleanメソッドによる文字列からのBooleanへの変換</strong>  
<strong>2.2　数字（Charまたはコードポイント）から数値（Int）への変換</strong>  
<strong>2.3　N進数表記</strong>  
<strong>2.3.1　特定の進数表記</strong>  
<strong>2.3.2　任意の進数表記</strong>  
<strong>2.3.3　文字とN進数表記での数値の相互変換</strong>  
***
<h3>Day 5 ミュータビリティとフォーマット</h3>  
***
<h3>Day 6 正規表現と文字列操作</h3>  
***
<h3>Day 7 文字の正規化とオプション</h3>  
***
