/*jslint browser: true, devel: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, indent: 4 */

/**
 * Default Config: this will be overrided by config
 **/
var default_config = {
    settings: {
        shuffle_questions: true,
        shuffle_choices: true,
        passing_score: 80,
        id_prefix: 'q',
        id_digits: 2,
        time_limit: 0,
        show_correct_answer: true,
        show_instant_result: true,
        title: 'Quiz',
        ignore_case: true,
        ignore_whitespace_count: true,
        trim: true,
        width: false,
        height: false,
        bgcolor: false,
        player_bgcolor: false,
        finish_at_result_page: true,
//        question_count:10,
//        question_count_array:[2,2],
        movable: false,
        mode: 'normal',
        restartable: true,
        scorm: 'auto',
        scale: 1,
        student_response_align: 'center',
        flexible_resultpage: false,
        version: '4.1.0',
        remove_powered_by: false,
        sound: false,
        messages: {
            passed: '合格！',
            failed: '不合格',
            correct: '正解！',
            incorrect: '不正解',
            neutral: '未回答',
            not_selected: '解答を選択してください',
            not_filled: '解答を入力してください',
            intro: 'Startボタンをクリックするとクイズが始まります',
            answer_true: '合格！',
            answer_false: '不合格',
            not_sorted: '並び替えをおこなってください',
            confirm_midstream_mark: '未解答の設問があります。途中終了して採点処理を行いますがよろしいですか？',
            confirm_mark: '終了して採点処理を行います。よろしいですか？'
        }
    },
    questions: [
        {question: "◯石◯鳥", answer: ["一","二"], label:["A", "B"], type: 'fill-in-multi', section:0},
        {question: "◯肉◯食", answer: ["弱","強"], type: 'fill-in-multi', section:0},
        {question: "<b>There are three dice in the picture.</b><br>[[images/dice.png]]", answer: "true", type: 'true-false', feedback: ['exactly', 'There are three dice. '], section:0},
        {question: "<b>What are in the picture?</b> <br>(hint: four characters)<br>[[images/dice.png]]", answer: ['dice'], type: 'fill-in', feedback: ['exactly', 'There are three dice. '], section:0},
        {question: "<b>What are in the picture?</b> <br>[[images/dice.png]]", choice: ['dice', 'maze', 'pen'], answer: 'dice', type: 'button', section:0},
        {question: "<b>Which word should be in the blank?</b><br> one, two, ( ___ ), four, five", choice: ['three', 'tree', 'free'], answer: 'three', feedback: '1,2,3,4,5', section:0},
        {question: "<b>Which word should be in the blank?</b><br>He ( ___ ) a book.", choice: ['has', 'is', 'was'], answer: 'has', feedback: ['Correct!!', 'He can not be a book.'], section:1},
        {question: "<b>Which word should be in the blank?</b><br>My name ( ___ ) Ken.", choice: ['is', 'were', 'been'], answer: 'is', feedback: ['Correct!!', '"Ken" is a singular noun', 'been is "past participle" of be'], section:1},
        {question: "<b>Which words can fill the blank?</b><br>This is a ( ___ ) car.", choice: ['expensive', 'cheap', 'white'], answer: ['cheap', 'white'], feedback: ['Correct!!', 'Expensive starts with a vowel'], section:1},
        {question: "<b>Which words can fill the blank?</b><br>This is ( ___ ) car.", choice: ['a', 'my', 'broken'], answer: ['a', 'my'], feedback: 'broken requires "a" infront of it', section:1},
        {question: "<b>Which words can fill the blank?</b><br>This is a ( ___ ).", choice: ['car', 'bus', 'data'], answer: ['car', 'bus'], section:1}
	]
};
var scorm12 = {correct: 'correct', incorrect: 'wrong'},
    scorm2004 = {correct: 'correct', incorrect: 'incorrect'},
    single_choice_template,
    multi_choice_template,
    button_template,
    input_template,
    textarea_template,
    fill_in_multi_template,
    true_false_template,
    sort_template,
    match_template,
    wordbank_template,
    result_detail_template1,
    result_detail_template2,
    position = 0,
    cq,
    suspend_data_version = '0007',
    suspend_data_body,
    pushed_state,
    state = 'loading',
    last_button_value,
    dragging = false,
    pc_flg = false,
    change_sort_flg = false,
    change_list_scale_height = 0,
    change_page_scale_height = 0,
    isIPhone = /iPhone/.test(navigator.userAgent),
    isIPad = /iPad/.test(navigator.userAgent),
    isAndroid = /Android/.test(navigator.userAgent),
    finished = false,
    _cfg;

/*******************
 * Init Quiz
 *******************/

$(function () {
    'use strict';
    init_quiz();
});

function init_quiz() {
    'use strict';
    var elem, i;
    cstate('intro');
    $('*').removeAttr('disabled');//for Firefox
    save_templates();
    load_config();
    set_scale_for_pc();
    init_scorm();
    if (!_cfg.settings.remove_powered_by) {
        _cfg.settings.messages.intro += '<div style="position:absolute;bottom:0;right:5px;font-size:12px;">Powered by <a href="http://quizgenerator.net" target="_blank">QuizGenerator'
            + _cfg.settings.version + '</a></div>';
    }
    //Update Interface
    for (elem in _cfg.settings.messages) {
        if (_cfg.settings.messages.hasOwnProperty(elem)) {
            $('#' + elem).html(_cfg.settings.messages[elem]);
        }
    }
    if (!_cfg.settings.show_instant_result) {
        $('#result_table1 .result').hide();
    }
    if (!_cfg.settings.movable) {
        $('th.button,td.button').hide();
    }
    if (!_cfg.settings.restartable) {
        $('#restart_button').hide();
    }
    document.title = _cfg.settings.title;
    $('#start_quiz_button_not_answerd').hide();
    $('#start_quiz_button_review').hide();
    $('#start_quiz_button').hide();
    $('#completion_rate_wrapper').hide();
    switch (_cfg.settings.mode) {
    case 'master':
        $('#completion_rate').html(get_completion_rate());
        if (count_not_correctly_answered_questions() === 0) {
            $('#start_quiz_button_not_answerd').attr('disabled', 'disabled');
        }
        $('#start_quiz_button_not_answerd').show();
        $('#start_quiz_button_review').show();
        $('#completion_rate_wrapper').show();
        break;
    default:
        $('#start_quiz_button').show();
    }
    //question count
    if (_cfg.settings.hasOwnProperty('question_count_array')) {
        _cfg.settings.question_count = 0;
        for (i = 0; i < _cfg.settings.question_count_array.length; i++){
            _cfg.settings.question_count += _cfg.settings.question_count_array[i];
        }
    } else if (!_cfg.settings.hasOwnProperty('question_count')) {
        _cfg.settings.question_count = _cfg.questions.length;
    }
    _cfg.settings.question_count = Math.min(_cfg.questions.length, _cfg.settings.question_count);
    prepare_questions();
    show('#page_intro');
}
function save_templates() {
    'use strict';
    single_choice_template = $('#choice').html();
    multi_choice_template = $('#multi_choice').html();
    button_template = $('#button').html();
    input_template = $('#input').html();
    fill_in_multi_template = $('#fill_in_multi').html();
    textarea_template = $('#textarea').html();
    true_false_template = $('#true_false').html();
    sort_template = $('#sort').html();
    wordbank_template = $('#wordbank').html();
    match_template = $('#match').html();
    result_detail_template1 = $('#result_table1 .result_detail');
    result_detail_template2 = $('#result_table2 .result_detail');
}
function set_scale_for_pc() {
    'use strict';
    var scale = _cfg.settings.scale,
        changeWidth,
        rate_top,
        review_bottom,
        student_response_width;
    change_list_scale_height = ($("#page_list").height() * scale) - $("#page_list").height();
    change_page_scale_height = ($("#page_result").height() * scale) - $("#page_result").height();
    changeWidth = ($("#page_intro").width() * scale) - $("#page_intro").width();
    rate_top = parseInt(($("#completion_rate_wrapper")).css("top").replace("px", ""), 10) + (($("#intro").height() * scale) - $("#intro").height());
    review_bottom =  parseInt(($("#start_quiz_button_not_answerd")).css("bottom").replace("px", ""), 10) + (($("#start_quiz_button_review").height() * scale) - $("#start_quiz_button_review").height());
    student_response_width = $('.student_response').width();
    $(".size_adjust, .page").each(function () {
        if ($(this).width() > 0) {
            if ((navigator.userAgent.toLowerCase().indexOf("trident") !== -1) || (navigator.userAgent.toLowerCase().indexOf("msie") !== -1)) {
                $(this).css("width", $(this).width() + changeWidth);
            } else {
                $(this).width($(this).width() + changeWidth);
            }
        }
        if ($(this).height() > 0) {
            if ((navigator.userAgent.toLowerCase().indexOf("trident") !== -1) || (navigator.userAgent.toLowerCase().indexOf("msie") !== -1)) {
                $(this).css("height", $(this).height() * scale);
            } else {
                $(this).height($(this).height() * scale);
            }
        }
    });
    $('.student_response').css("width", student_response_width + changeWidth);
    $("#completion_rate_wrapper").css("top", rate_top);
    $("#start_quiz_button_not_answerd").css("bottom", review_bottom);
    if(_cfg.settings.width) $(".page").width(_cfg.settings.width);
    if(_cfg.settings.height)$(".page").height(_cfg.settings.height);
}
function load_config() {
    var i;
    if ( typeof config !== "undefined"){
        delete default_config.questions;
        _cfg = merge(config, default_config);
    } else {
        _cfg = default_config;
    }
    for (i = 0; i < _cfg.questions.length; i++) {
        _cfg.questions[i].iid = i;
    }
}
function prepare_questions() {
    'use strict';
    var i,
        feedback,
        q,
        j,
        shuffle_flg;
    for (i = 0; i < _cfg.questions.length; i++) {
        feedback = false;
        q = _cfg.questions[i];
        if (q.hasOwnProperty('type') && (q.type === 'fill-in' || q.type === 'textarea' || q.type === 'sort' || q.type === 'match' || q.type === 'wordbank' || q.type === 'fill-in-plus' || q.type === 'fill-in-multi')) {
            q.type = String(q.type);//Nothing to do
        } else if ((q.hasOwnProperty('type') && q.type === 'ma') || (!q.hasOwnProperty('type') && typeof q.answer === 'object')) {
            q.type = 'ma';
        } else if ((q.hasOwnProperty('type') && (q.type === 'sa' || q.type === 'button' || q.type === 'true-false')) || (!q.hasOwnProperty('type') && typeof q.answer === 'string')) {
            if (!q.hasOwnProperty('type') && typeof q.answer === 'string') {
                q.type = 'sa';
            }
            if (q.type === 'true-false') {
                q.choice = ['true', 'false'];
            }
            if (typeof q.answer === 'string') {
                q.answer = [q.answer];
            }
            q.feedback_map = {};
            for (j = 0; j < q.choice.length; j++) {
                if (q.hasOwnProperty('feedback')) {
                    if (typeof q.feedback === 'string') {
                        feedback = q.feedback;
                    } else if (j < q.feedback.length) {
                        feedback = q.feedback[j];
                    }
                }
                q.feedback_map[q.choice[j]] = feedback;
            }
        } else {
            alert("the setting file is broken");
        }
        delete q.feedback;
        if (_cfg.settings.shuffle_choices) {    //shuffle choice order
            if (q.type === 'sa' || q.type === 'ma' || q.type === 'button') {
                q.choice.shuffle();
            }
        }
        if (q.type === 'sort' || q.type === 'match' || q.type === 'wordbank') {
            if (q.choice.length > 1) {
                shuffle_flg = false;
                while (!shuffle_flg) {
                    q.choice.shuffle();
                    shuffle_flg = is_shuffle(q.choice, q.answer);
                }
            }
        }
        if (!q.hasOwnProperty('quiz_id')) {//generate ids
            _cfg.questions[i].id = String(i + 1);
            while (_cfg.questions[i].id.length < _cfg.settings.id_digits) {
                _cfg.questions[i].id = '0' + _cfg.questions[i].id;
            }
            _cfg.questions[i].id = _cfg.settings.id_prefix + _cfg.questions[i].id;
        }
    }
}
function load_suspend_data() {
    'use strict';
    var i,
        suspend_data = getValue('cmi.suspend_data');
    if (suspend_data && suspend_data.substring(0, 4) === suspend_data_version) {
        suspend_data_body = suspend_data.substring(4);
        for (i = 0; i < suspend_data_body.length; i += 4) {
            _cfg.questions[i / 4].correct_count = parseInt(suspend_data_body.substring(i, i + 2), 10);
            _cfg.questions[i / 4].incorrect_count = parseInt(suspend_data_body.substring(i + 2, i + 4), 10);
        }
    } else {
        suspend_data_body = '';
        for (i = 0; i < _cfg.questions.length; i++) {
            suspend_data_body += '0000';
        }
    }
    for (i = 0; i < _cfg.questions.length; i++) {
        if (!_cfg.questions[i].hasOwnProperty('correct_count')) {
            _cfg.questions[i].correct_count = 0;
            _cfg.questions[i].incorrect_count = 0;
        }
    }
}
function save_suspend_data() {
    'use strict';
    var i,
        suspend_data,
        cc,
        ic;
    cc = [];
    ic = [];
    for (i = 0; i < suspend_data_body.length; i += 4) {
        cc[i / 4] = suspend_data_body.substring(i, i + 2);
        ic[i / 4] = suspend_data_body.substring(i + 2, i + 4);
    }
    for (i = 0; i < _cfg.questions.length; i++) {
        cc[_cfg.questions[i].iid] = format99(_cfg.questions[i].correct_count);
        ic[_cfg.questions[i].iid] = format99(_cfg.questions[i].incorrect_count);
    }
    suspend_data = suspend_data_version;
    for (i = 0; i < cc.length; i++) {
        suspend_data += cc[i] + ic[i];
    }
    setValue('cmi.suspend_data', suspend_data);
}
function format99(num) {
    'use strict';
    if (num < 10) {
        return '0' + num;
    }
    if (num < 100) {
        return String(num);
    }
    return '99';
}
//Sectioned mode
function order_by_section() {
    'user strict'
    var i, j, k = 0;
    for (i = 0; i < _cfg.questions.length; i++) {
        _cfg.questions[i].sort = 9999;
    }
    for (j = 0; j < _cfg.settings.question_count_array.length; j++){
        while(_cfg.settings.question_count_array[j] > 0){
            k = Math.floor(Math.random() * _cfg.questions.length);
            if(_cfg.questions[k].sort == 9999){
                if(_cfg.questions[k].section == j){
                    _cfg.questions[k].sort = j + Math.random();
                    _cfg.settings.question_count_array[j]--;
                }
            }
        }
    }
    _cfg.questions.sort(function (a, b) {return a.sort - b.sort;});
}
//Master Mode
function order_by_correct_answer_minus_incorrect_answer() {
    'use strict';
    var i;
    for (i = 0; i < _cfg.questions.length; i++) {
        _cfg.questions[i].sort = _cfg.questions[i].correct_count - _cfg.questions[i].incorrect_count;
    }
    _cfg.questions.sort(function (a, b) {return (a.correct_count - a.incorrect_count) - (b.correct_count - b.incorrect_count); });
}
function filter_by_correct_answer_count(limit) {
    'use strict';
    var i;
    if (i === undefined) {
        i = 0;
    }
    for (i = 0; i < _cfg.questions.length; i++) {
        if (_cfg.questions[i].correct_count > limit) {
            _cfg.questions.splice(i, 1);
            i--;
        }
    }
}
function count_not_correctly_answered_questions() {
    'use strict';
    var count = 0,
        i;
    for (i = 0; i < _cfg.questions.length; i++) {
        if (_cfg.questions[i].correct_count === 0) {
            count++;
        }
    }
    return count;
}
function get_completion_rate() {
    'use strict';
    return String(Math.round((1 - (count_not_correctly_answered_questions() / _cfg.questions.length)) * 100));
}

/*******************
 * Start Quiz
 *******************/
function start_quiz(mode) {
    'use strict';
    if (mode !== undefined) {
        if (mode === 'not_answerd') {
            filter_by_correct_answer_count(0);
        } else if (mode === 'review') {
            order_by_correct_answer_minus_incorrect_answer();
            _cfg.questions = _cfg.questions.slice(0, _cfg.settings.question_count);
        }
    }
    _cfg.settings.question_count = Math.min(_cfg.questions.length, _cfg.settings.question_count);
    $('#question_count').html(_cfg.settings.question_count);
    if (_cfg.settings.hasOwnProperty('question_count_array')) {
        order_by_section();
    }else if (_cfg.settings.shuffle_questions) {
        _cfg.questions.shuffle();
    }
    display_quiz();
    init_timer();
    show('#page_quiz');
}
function init_timer() {
    'use strict';
    if (_cfg.settings.time_limit) {
        $('.timer').countdown({until: new Date(new Date().getTime() + _cfg.settings.time_limit * 1000),
            format: 'HMS', onTick: checkTimeLimit, tickInterval: 1, compact: true});
    } else {
        $('.timer').remove();
        $('.timer_wrapper').remove();
    }
}
function checkTimeLimit(t) {
    'use strict';
    var i;
    if (finished) {
        return;
    }
    for (i = 0; i < 7; i++) {
        if (t[i] !== 0) {
            return;
        }
    }
    $('.ui-draggable-dragging').remove();
    check_answer("force");
    show_result();
}

/*******************
 * Display Quiz
 *******************/
function display_quiz() {
    'use strict';
    var i,
        cq_question,
        input_html,
        choice_value,
        choice_html,
        scale,
        match_list_width,
        drag_list,
        dropDownFunc;
    cstate('quiz');
    cq = _cfg.questions[position];
    $('#position').html(position + 1);
    $('#choices').empty();
    $('#instant_response_disp').hide();
    $('#instant_response_disp_none').hide();
    $('#instant_result_wrapper').hide();
    $('#instant_answer_wrapper').hide();
    $('#instant_feedback_wrapper').hide();
    $('#instant_response_container').hide();
    $('#instant_response_background').hide();
    $('#answer_mark_correct').hide();
    $('#answer_mark_incorrect').hide();
    if (has_next_quiz() && _cfg.settings.movable) {
        $('#display_next_quiz').css('visibility', 'visible');
    } else {
        $('#display_next_quiz').css('visibility', 'hidden');
    }
    if (has_prev_quiz() && _cfg.settings.movable) {
        $('#display_prev_quiz').css('visibility', 'visible');
    } else {
        $('#display_prev_quiz').css('visibility', 'hidden');
    }
    if (_cfg.settings.show_instant_result) {
        $('#not_disp_answer_next_button').hide();
        $('#not_disp_answer_mark_button').hide();
        if (cq.type !== 'button' && cq.type !== 'true-false') {
            $('#check_answer_button').show();
        } else {
            $('#check_answer_button').hide();
        }
        $('#check_answer_next_button').hide().attr('disabled', 'disabled');
    } else {
        $('#check_answer_button').hide();
        if (!_cfg.settings.movable) {
            $('#display_next_quiz').css('display', 'none');
            $('#display_prev_quiz').css('display', 'none');
            $('#not_disp_answer_mark_button').css('margin-left', '5px');
            if (has_next_quiz()) {
                $('#not_disp_answer_next_button').show();
            } else {
                $('#not_disp_answer_next_button').hide();
            }
        } else {
            $('#not_disp_answer_next_button').hide();
        }
        $('#not_disp_answer_mark_button').show();
    }
    if ($(':focus').attr('id') === 'check_answer_next_button') {
        $('#check_answer_next_button').blur();
    }
    cq_question = cq.question;
    if (cq.type !== 'wordbank') {
        cq_question = convert_image_tags(cq_question);
    } else {
        cq_question = convert_drop_list(cq_question);
    }
    $('#question').html(cq_question);
    if (cq.type === 'fill-in' || cq.type === 'fill-in-plus') {
        input_html = '<div class="choice">' + input_template + '</div>';
        $('#choices').append(input_html);
        $('#choices .input').attr("value", cq.student_response);
        setTimeout(function () {$('#choices .input').focus(); }, 100);
    } else if (cq.type === 'fill-in-multi'){
        input_html = '<div class="choice">' + fill_in_multi_template + '</div>';
        $('#choices').append(input_html);
        $('#choices .input').hide();
        for(var i = 0; i < cq.answer.length ; i++){
            $('#choices .pos' + i).show();
            if(cq.label && cq.label[i]){
                $('#choices div.pos'+i).html(cq.label[i]);
            }
        }
        if(cq.student_response){
            for(var i = 0; i < cq.answer.length ; i++){
                $('#choices input.input.pos'+i).val(cq.student_response[i]);
            }
        }
        setTimeout(function () {$('#choices .input.pos0').focus(); }, 100);
    } else if (cq.type === 'textarea'){
        input_html = '<div class="choice">' + textarea_template + '</div>';
        $('#choices').append(input_html);
        $('#choices textarea').html(cq.student_response);
        setTimeout(function () {$('#choices .input').focus(); }, 100);
    } else if (cq.type === 'button') {
        for (i = 0; i < cq.choice.length; i++) {
            choice_value = convert_image_tags(cq.choice[i]);
            choice_html = button_template;
            choice_html = choice_html.replace(/\[\[choice\]\]/g, choice_value);
            choice_html = choice_html.replace(/\[\[choice_key\]\]/g, htmlencode(cq.choice[i]));
            choice_html = choice_html.replace(/\[\[choice_key_js_escaped\]\]/g, jsencode(cq.choice[i]));
            choice_html = choice_html.replace(/\[\[choice_id\]\]/g, 'choice_' + position + '_' + i);
            choice_html = '<div class="choice">' + choice_html + '</div>';
            $('#choices').append(choice_html);
        }
    } else if (cq.type === 'true-false') {
        $('#choices').append(true_false_template);
    } else if (cq.type === 'sort') {
        setDragDropList();
        setDragDropEvent();
        setTimeout(function () {setDivHeight(); }, 10);
    } else if (cq.type === 'match') {
        setDragDropList();
        setDragDropEvent();
        setTimeout(function () {setDivHeight(); }, 10);
        if (pc_flg) {
            scale = _cfg.settings.scale;
            match_list_width = $(".drag-choice").css("width").replace("px", "") * scale;
            $(".drag-choice,.drop-choice-key").css("width", match_list_width);
        }
    } else if (cq.type === 'wordbank') {
        for (i = 0; i < cq.choice.length; i++) {
            choice_value = cq.choice[i];
            choice_html = wordbank_template;
            choice_html = choice_html.replace(/\[\[choice\]\]/g, choice_value);
            choice_html = choice_html.replace(/\[\[choice_key\]\]/g, htmlencode(cq.choice[i]));
            choice_html = choice_html.replace(/\[\[choice_idx\]\]/g, i);
            $('#choices').append(choice_html);
        }
        setDragDropEvent();
        setTimeout(function () {setDivWidth(); }, 0);
        if (cq.student_response) {
            dropDownFunc = function () {
                if ($(this).find('.drag-value').attr('value') === cq.student_response[i]) {
                    drag_list = $(this).children('.drag-choice-wordbank');
                    drag_list.parent("#choices .drop-choice-list").css("display", "none");
                    $('#question .drop-choice-wordbank').eq(i).append(drag_list);
                    drag_list.prevAll('.wordbank-key').css("display", "none");
                }
            };
            for (i = 0; i < cq.student_response.length; i++) {
                if (cq.student_response[i] !== '未選択') {
                    $('.drop-choice-list').each(dropDownFunc);
                }
            }
        }
    } else {
        for (i = 0; i < cq.choice.length; i++) {
            choice_value = convert_image_tags(cq.choice[i]);
            choice_html = '';
            if (cq.type === 'ma') {
                choice_html = multi_choice_template;
            } else if (cq.type === 'sa') {
                choice_html = single_choice_template;
            }
            choice_html = choice_html.replace(/\[\[choice\]\]/g, choice_value);
            choice_html = choice_html.replace(/\[\[choice_key\]\]/g, htmlencode(cq.choice[i]));
            choice_html = choice_html.replace(/\[\[choice_id\]\]/g, 'choice_' + position + '_' + i);
            choice_html = '<div class="choice">' + choice_html + '</div>';
            $('#choices').append(choice_html);
        }
        $('.choice_checkbox').each(
            function () {
                if (cq.student_response && array_contain([$(this).attr('value')], cq.student_response)) {
                    $(this).attr('checked', 'checked');
                }
            }
        );
        $('.choice_radio').each(
            function () {
                if (cq.student_response && array_contain([$(this).attr('value')], cq.student_response)) {
                    $(this).attr('checked', 'checked');
                }
            }
        );
        setTimeout(function () {$('.choice input')[0].focus(); }, 100);
    }
    $(".thumnail").load(function () {
        $(this).resizable({minWidth: $(this).outerWidth(), maxWidth: 450, aspectRatio: $(this).outerWidth() / $(this).outerHeight(), handles: "e"});
        $(".ui-resizable-e").css("width", 450);
        $(".ui-resizable-e").css("background-color", "#EEE");
        $(".ui-resizable-e").css("opacity", "0.01");
        $(".ui-resizable-e").css("right", "0px");
    });
    if (cq.result) {
        check_answer();
    }
    cq.time = getCurrentTimeForSCORM12();
}
function display_prev_quiz() {
    'use strict';
    if (has_prev_quiz()) {
        store_answer(false);
        position--;
        display_quiz();
    }
}
function display_next_quiz() {
    'use strict';
    if (has_next_quiz()) {
        store_answer(false);
        position++;
        display_quiz();
    }
}
function has_prev_quiz() {
    'use strict';
    return position > 0;
}
function has_next_quiz() {
    'use strict';
    return position < _cfg.settings.question_count - 1;
}
function convert_image_tags(str) {
    'use strict';
    if (is_mp3_audio_supported()) {
        str = str.replace(/\[\[(.*[.]mp3)\]\]/g, '<audio class="audio_with_controls" src="$1" preload controls style="vertical-align: middle;margin-left:5px;"/>');
    } else {
        str = str.replace(/\[\[(.*[.]mp3)\]\]/g,
            '<span style="background-color:black;">' +
            '<object type="application/x-shockwave-flash" data="player_mp3_mini.swf" width="200" height="20" class="flash_with_controls">' +
            '<param name="movie" value="player_mp3_mini.swf"/>' +
            '<param name="bgcolor" value="000000" />' +
            '<param name="FlashVars" value="mp3=$1" />' +
            '<param name="wmode" value="transparent">' +
            '</object></span>');
    }
    str = str.replace(/\{\{([^\}]*)\}\}/g, '<img src="$1" class="thumnaildefault" style="margin: 0px;"/>');
    return str.replace(/\[\[([^\]]*)\]\]/g, '<img src="$1" class="thumnail"  style="margin: 0px;"/>');
}
function convert_drop_list(str) {
    'use strict';
    return str.replace(/\{([^\}])\}/g, '<span class = "drop-choice-wordbank"><span class="wordbank-key">（$1）</span></span>');
}
function button_click(value) {//Question type:button
    'use strict';
    last_button_value = value;
    check_answer();
}
function store_answer(no_alert) {
    'use strict';
    var checked_answer,
        student_response,
        selected;
    if (state !== 'quiz') {
        return;
    }
    if (cq.hasOwnProperty('result')) {
        return;
    }
    if (cq.type === 'sa' || cq.type === 'ma') {
        checked_answer = $('.choice_radio:checked');
        student_response = [];
        if (checked_answer.length === 0) {
            checked_answer = $('.choice_checkbox:checked');
        }
        if (checked_answer.length === 0) {
            if (no_alert === undefined) {
                qalert(_cfg.settings.messages.not_selected);
                return;
            }
        } else {
            checked_answer.each(
                function () {
                    student_response.push($(this).attr('value'));
                }
            );
        }
    } else if (cq.type === 'fill-in' || cq.type === 'fill-in-plus' || cq.type === 'textarea') {
        student_response = $('.input').val();
        if (student_response.length === 0) {
            if (no_alert === undefined) {
                qalert(_cfg.settings.messages.not_filled);
                return;
            }
        }
    } else if (cq.type === 'fill-in-multi') {
        student_response = [];
        $('.input').each(function () {
            if(student_response.length < cq.answer.length){
                student_response.push($(this).val());
            }
        });
    } else if (cq.type === 'button' || cq.type === 'true-false') {
        student_response = last_button_value;
        last_button_value = false;
    } else if (cq.type === 'sort' || cq.type === 'match') {
        student_response = [];
        $(".drag-choice").each(function () {
            student_response.push($(this).find('.drag-value').attr('value'));
        });
        if (!change_sort_flg && !is_shuffle(cq.choice, student_response)) {
            student_response = [];
            if (no_alert === undefined) {
                qalert(_cfg.settings.messages.not_sorted);
                return;
            }
        }
    } else if (cq.type === 'wordbank') {
        student_response = [];
        selected = true;
        $(".drop-choice-wordbank").each(function () {
            if ($(this).children(".drag-choice-wordbank").length === 0) {
                selected = false;
                if (no_alert === undefined) {
                    qalert(_cfg.settings.messages.not_selected);
                    return false;
                }
                student_response.push('未選択');
                return true;
            }
            student_response.push($(this).find('.drag-value').attr('value'));
        });
        if (!selected && no_alert === undefined) {
            return;
        }
    }
    cq.student_response = student_response;
}
function check_answer(no_alert, no_store) {
    'use strict';
    var is_correct,
        i,
        student_response;
    if (no_store === undefined) {
        store_answer(no_alert);
    }
    if (no_alert !== undefined && !cq.hasOwnProperty('student_response')) {
        if (cq.type === 'sa' || cq.type === 'ma' || cq.type === 'sort' || cq.type === 'match' || cq.type === 'wordbank' || cq.type == 'fill-in-multi') {
            cq.student_response = [];
        } else if (cq.type === 'fill-in' || cq.type === 'fill-in-plus' || cq.type === 'textarea') {
            cq.student_response = '';
        }
    }
    student_response = cq.student_response;
    if (cq.type === 'wordbank' && $.inArray("未選択", student_response) !== -1) {
        if (no_alert === undefined) {
            return;
        }
        cq.student_response = [];
        student_response = [];
    }
    if ((student_response && student_response.length) || no_alert !== undefined) {
        if (cq.type === 'sa' || cq.type === 'ma') {
            is_correct = array_equal(student_response, cq.answer);
        } else if (cq.type === 'button' || cq.type === 'true-false') {
            is_correct = student_response === cq.answer[0];
        } else if (cq.type === 'fill-in' || cq.type === 'textarea') {
            if (student_response.length === 0) {
                if (no_alert === undefined) {
                    qalert(_cfg.settings.messages.not_filled);
                    return;
                }
            }
            is_correct = array_contain([student_response], cq.answer);
        } else if (cq.type === 'fill-in-multi') {
            if (student_response === false || student_response.length === 0) {
                is_correct = false;
            } else {
                is_correct = true;
                for (i = 0; i < cq.answer.length ; i++) {
                    if (student_response[i] !== cq.answer[i]) {
                        is_correct = false;
                        break;
                    }
                }
            }
        } else if (cq.type === 'fill-in-plus') {
            if (student_response.length === 0) {
                if (no_alert === undefined) {
                    qalert(_cfg.settings.messages.not_filled);
                    return;
                }
            }
            is_correct = array_contain_fillin_plus([student_response], cq.answer);
        } else if (cq.type === 'sort') {
            if (student_response.length === 0) {
                is_correct = false;
            } else {
                is_correct = true;
                for (i = 0; i < student_response.length; i++) {
                    if (student_response[i] !== cq.answer[i]) {
                        is_correct = false;
                        break;
                    }
                }
                disableDragDrop($(".drag-choice"), $(".drop-choice"));
            }
        } else if (cq.type === 'match') {
            if (student_response.length === 0) {
                is_correct = false;
            } else {
                is_correct = true;
                for (i = 0; i < student_response.length; i++) {
                    if (_cfg.settings.show_instant_result && _cfg.settings.show_correct_answer) {
                        if (student_response[i] === cq.answer[i]) {
                            $("#choice_" + i).find("li").css("color", "green");
                        } else {
                            if ($("#choice_" + i).find(".disp_correct").length === 0) {
                                $("#choice_" + i).find("li").css("color", "red");
                                $("#choice_" + i).find("li").append("<span class='disp_correct' style='color:green'>（" + cq.answer[i] + "）</span>");
                            }
                            is_correct = false;
                        }
                    } else {
                        if (student_response[i] !== cq.answer[i]) {
                            is_correct = false;
                            break;
                        }
                    }
                }
                disableDragDrop($(".drag-choice"), $(".drop-choice"));
            }
        } else if (cq.type === 'wordbank') {
            if (student_response.length === 0) {
                is_correct = false;
            } else {
                is_correct = true;
                for (i = 0; i < student_response.length; i++) {
                    if (_cfg.settings.show_instant_result && _cfg.settings.show_correct_answer) {
                        if (student_response[i] === cq.answer[i]) {
                            $("#question .drag-choice-wordbank").eq(i).css("color", "green");
                        } else {
                            if ($("#question .drag-choice-wordbank").eq(i).children(".disp_correct").length === 0) {
                                $("#question .drag-choice-wordbank").eq(i).css("color", "red");
                                $("#question .drag-choice-wordbank").eq(i).append("<span class='disp_correct' style='color:green'>（" + cq.answer[i] + "）</span>");
                            }
                            is_correct = false;
                        }
                    } else {
                        if (student_response[i] !== cq.answer[i]) {
                            is_correct = false;
                            break;
                        }
                    }
                }
                disableDragDrop($(".drag-choice-wordbank"), $(".drop-choice-wordbank"));
            }
        }
        $('.input').attr('disabled', 'disabled');
        $('.choice_radio').attr('disabled', 'disabled');
        $('.choice_checkbox').attr('disabled', 'disabled');
        set_result(is_correct, no_alert);
        if (_cfg.settings.show_instant_result) {
            show_ox_fb();
            show_sa_fb();
            $('#instant_response_container').show(1);
            $('#instant_response_background').show();
            if (count_incorrect_answers() + count_correct_answers() < _cfg.settings.question_count) {
                if (has_next_quiz()) {
                    $('#check_answer_next_button').show();
                    $('#check_answer_next_button').removeAttr('disabled');
                }
                setTimeout(function () {$('#check_answer_next_button').focus(); }, 100);
            } else {
                $('#show_result').show();
                $('#abort_quiz').hide();
                setTimeout(function () {$('#show_result').focus(); }, 100);
            }
            $('#check_answer_button').hide();
        }
    }
}
function check_all_answers() {
    'use strict';
    var i;
    store_answer(false);
    for (i = 0; i < _cfg.settings.question_count; i++) {
        cq = _cfg.questions[i];
        check_answer("no_alert", "no_store");
    }
}
function array_equal(a1, a2) {
    'use strict';
    return array_contain(a1, a2) && array_contain(a2, a1);
}
function array_contain(a1, a2) {
    'use strict';
    var i,
        j;
    for (i = 0; i < a1.length; i++) {
        for (j = 0; j < a2.length; j++) {
            if (is_equal(a1[i], a2[j])) {
                break;
            }
        }
        if (j === a2.length) {
            return false;
        }
    }
    return true;
}
function array_contain_fillin_plus(a1, a2) {
    'use strict';
    var j,
        k,
        answers;
    for (j = 0; j < a2.length; j++) {
        answers = a2[j].split(',');
        for (k = 0; k < answers.length; k++) {
            if (_cfg.settings.ignore_case) {
                a1[0] = a1[0].toLowerCase();
                answers[k] = answers[k].toLowerCase();
            }
            if (a1[0].indexOf(answers[k]) >= 0) {
                break;
            }
            if (k === answers.length - 1) {
                return false;
            }
        }
    }
    return true;
}
function is_equal(a1, a2) {
    'use strict';
    if (cq.type === 'sa' || cq.type === 'ma') {
        return a1 === a2;
    }
    if (_cfg.settings.ignore_case) {
        a1 = a1.toLowerCase();
        a2 = a2.toLowerCase();
    }
    if (_cfg.settings.ignore_whitespace_count) {
        a1 = a1.replace(/[\s　]+/g, ' ');
        a2 = a2.replace(/[\s　]+/g, ' ');
    }
    if (_cfg.settings.trim) {
        a1 = a1.replace(/^[\s　]+|[\s　]+$/g, '');
        a2 = a2.replace(/^[\s　]+|[\s　]+$/g, '');
    }
    return a1 === a2;
}
function show_sa_fb() {
    'use strict';
    if ((cq.type === 'sa' || cq.type === 'button' || cq.type === 'true-false') && cq.feedback_map[cq.student_response]) {
        $('#instant_feedback_msg').html(cq.feedback_map[cq.student_response]);
        $('#instant_feedback_wrapper').show();
    }
}
function show_ox_fb() {
    'use strict';
    if (cq.result === 'correct') {
        if (cq.hasOwnProperty('feedback_tf') && cq.feedback_tf[0]) {
            $('#instant_feedback_msg').html(cq.feedback_tf[0]);
            $('#instant_feedback_wrapper').show();
        }
    } else {
        if (cq.hasOwnProperty('feedback_tf') && cq.feedback_tf[1]) {
            $('#instant_feedback_msg').html(cq.feedback_tf[1]);
            $('#instant_feedback_wrapper').show();
        }
    }
}
function is_mp3_audio_supported() {
    'use strict';
    var strUA = "";
    strUA = navigator.userAgent.toLowerCase();
    if (strUA.indexOf("msie 8") !== -1) {
      return false;
    }
    if (strUA.indexOf("msie 7") !== -1) {
      return false;
    }
    if (strUA.indexOf("msie 6") !== -1) {
      return false;
    }
    if (strUA.indexOf("trident") !== -1) {
        return true;
    }
    if (strUA.indexOf("iphone") !== -1) {
        return true;
    }
    if (strUA.indexOf("ipad") !== -1) {
        return true;
    }
    if (strUA.indexOf("android") !== -1) {
        return true;
    }
    if (strUA.indexOf("webkit") !== -1) {
        return true;
    }
    return false;
}
function play_correct_sound() {
    'use strict';
    if (_cfg.settings.sound){
        if (is_mp3_audio_supported()) {
            document.getElementById("correct_sound").play();
        } else {
            play('get.mp3');
        }
    }
}
function play_incorrect_sound() {
    'use strict';
    if (_cfg.settings.sound){
        if (is_mp3_audio_supported()) {
            document.getElementById("incorrect_sound").play();
        } else {
            play('koke.mp3');
        }
    }
}
function play_dragged_sound() {
    'use strict';
    if (_cfg.settings.sound){
        if (is_mp3_audio_supported()) {
            document.getElementById("dragged_sound").play();
        } else {
            play('move.mp3');
        }
    }
}
function set_result(is_correct, no_alert) {
    'use strict';
    if (is_correct) {
        if (_cfg.settings.show_instant_result && no_alert === undefined) {
            response_disp(true);
            $('#instant_result_msg').html(_cfg.settings.messages.correct);
            $('#instant_result_wrapper').show();
            $('#answer_mark_correct').show();
            if (!cq.hasOwnProperty('result')) {
                play_correct_sound();
            }
        }
        if (!cq.hasOwnProperty('result')) {
            cq.result = 'correct';
            cq.correct_count++;
        }
    } else {
        if (_cfg.settings.show_instant_result && no_alert === undefined) {
            response_disp(true);
            $('#instant_result_msg').html(_cfg.settings.messages.incorrect);
            $('#instant_result_wrapper').show();
            $('#answer_mark_incorrect').show();
            if (!cq.hasOwnProperty('result')) {
                play_incorrect_sound();
            }
            if (_cfg.settings.show_correct_answer && no_alert === undefined) {
                $('#instant_answer_msg').html(formatter(cq, 'answer'));
                $('#instant_answer_wrapper').show();
            }
        }
        if (!cq.hasOwnProperty('result')) {
            if (cq.student_response && cq.student_response.length > 0) {
                cq.result = 'incorrect';
                cq.incorrect_count++;
            } else {
                cq.result = 'neutral';
            }
        }
    }
}
function response_disp(disp_flg) {
    'use strict';
    if (disp_flg) {
        $('#instant_response_background').css("opacity", "0.8");
        $('#instant_result_wrapper').css("opacity", "1");
        $('#instant_answer_wrapper').css("opacity", "1");
        $('#instant_feedback_wrapper').css("opacity", "1");
        $('#instant_response_disp').hide();
        $('#instant_response_disp_none').show();
		$('#answer_mark').show();
    } else {
        $('#instant_response_background').css("opacity", "0.01");
        $('#instant_result_wrapper').css("opacity", "0.01");
        $('#instant_answer_wrapper').css("opacity", "0.01");
        $('#instant_feedback_wrapper').css("opacity", "0.01");
        $('#instant_response_disp').show();
        $('#instant_response_disp_none').hide();
		$('#answer_mark').hide();
    }
}
function check_choiced_next_quiz() {
    'use strict';
    if (has_next_quiz()) {
        store_answer();
        if (!cq.hasOwnProperty('student_response')) {
            return;
        }
        if (!cq.student_response || !cq.student_response.length || (cq.type === 'wordbank' && $.inArray("未選択", cq.student_response) !== -1)) {
            return;
        }
        position++;
        display_quiz();
    }
}
function mark_quiz() {
    'use strict';
    var is_all_answer,
        i,
        q;
    if (!_cfg.settings.show_instant_result) {
        if (!_cfg.settings.movable && position + 1 === _cfg.settings.question_count) {
            store_answer();
            if (!cq.hasOwnProperty('student_response')) {
                return;
            }
            if (!cq.student_response || !cq.student_response.length || (cq.type === 'wordbank' && $.inArray("未選択", cq.student_response) !== -1)) {
                return;
            }
        } else {
            store_answer(false);
        }
        is_all_answer = true;
        for (i = 0; i < _cfg.settings.question_count; i++) {
            q = _cfg.questions[i];
            if (!q.hasOwnProperty('student_response')) {
                is_all_answer = false;
            } else if (!q.student_response ||
                    !q.student_response.length ||
                    (q.type === 'wordbank' && $.inArray("未選択", q.student_response !== -1))) {
                is_all_answer = false;
            }
        }
        if (!is_all_answer) {
            if (!confirm(_cfg.settings.messages.confirm_midstream_mark)) {
                return;
            }
        } else if (_cfg.settings.movable) {
            if (!confirm(_cfg.settings.messages.confirm_mark)) {
                return;
            }
        }
        show_result();
    }
}
/*******************
 * Show List
 *******************/
function show_list() {
    'use strict';
    pushed_state = state;
    store_answer(false);
    cstate('list');
    $('#result_table tbody').empty();
    make_result_table('#result_table1');
    show('#page_list');
    if (_cfg.settings.student_response_align) {
        $('#page_list .student_response').find('div').css("text-align", _cfg.settings.student_response_align);
    }
    if (isIPhone || isIPad || isAndroid) {
        return;
    }
    $('#page_list div.scrollbartable').remove();
    if (_cfg.hasOwnProperty('table_width')) {
        $('#result_table1').css('width', _cfg.table_width);
    } else {
        _cfg.table_width = $('#result_table1').css('width');
    }
    $('#result_table1').scrollbarTable(290 + change_list_scale_height);
    $('#page_list .qtable').css('width', $('#result_table1').width() - 14);
    $('#page_list .student_response').find('div').css("width", $('#page_list .student_response').width() - 40);
}
function get_hide_list_n(i) {
    'use strict';
    return function () {hide_list(i); };
}
function make_result_table(sel) {
    'use strict';
    var result_detail_record,
        q,
        i,
        qOrig,
        elem;
    $('.result_detail').remove();
    for (i = 0; i < _cfg.settings.question_count; i++) {
        if (sel === '#result_table1') {
            result_detail_record = result_detail_template1.clone();
        } else {
            result_detail_record = result_detail_template2.clone();
        }
        q = clone(_cfg.questions[i]);
        qOrig = _cfg.questions[i];
        $('.list_to_quiz', result_detail_record).click(get_hide_list_n(i));
        $('.no', result_detail_record).html(i + 1);
        if (!qOrig.hasOwnProperty("student_response") || q.student_response === '' || q.student_response === false) {
            q.student_response = '';
        }
        if (!qOrig.hasOwnProperty("result") || q.result === '' || (sel === '#result_table1' && !_cfg.settings.show_instant_result)) {
            q.result = '';
        }
        for (elem in q) {
            if (qOrig.hasOwnProperty(elem)) {
                $('.' + elem, result_detail_record).html(wrap_div(formatter(q, elem)));
            }
        }
        $('.result', result_detail_record).html(_cfg.settings.messages[q.result]);
        $(sel + ' tbody').append(result_detail_record);
    }
}
function formatter(q, elem) {
    'use strict';
    var dispAnswerArray,
        i,
        answers,
        j;
    if (q.type === 'true-false') {
        if (q[elem] === undefined) {
            return '-';
        }
        if (q[elem][0] === 'true' || q[elem] === 'true') {
            return "正しい";
        }
        if (q[elem][0] === 'false' || q[elem] === 'false') {
            return "間違い";
        }
        return convert_image_tags(String(q[elem]));
    }
    if (typeof q[elem] === 'object') {
        if (q.type === 'fill-in-plus' && elem === 'answer') {
            dispAnswerArray = new Array(q[elem].length);
            for (i = 0; i < q[elem].length; i++) {
                answers = q[elem][i].split(',');
                for (j = 0; j < answers.length; j++) {
                    if (j === 0) {
                        dispAnswerArray[i] = answers[j];
                    } else {
                        dispAnswerArray[i] = dispAnswerArray[i] + '(' + answers[j] + ')';
                    }
                }
            }
            return convert_image_tags(dispAnswerArray.join(', '));
        }
        if (q[elem].hasOwnProperty('length')) {
            return convert_image_tags(q[elem].join(', '));
        }
    } else {
        if (q[elem] === undefined) {
            return '-';
        }
        return convert_image_tags(String(q[elem]));
    }
}
function hide_list(num) {
    'use strict';
    if (num !== undefined) {
        position = num;
    }
    cstate(pushed_state);
    if (state === 'quiz' || state === 'feedback') {
        display_quiz();
        show('#page_quiz');
    } else if (state === 'result') {
        show('#page_result');
    }
}
/*******************
 * Show Result
 *******************/
function show_result() {
    'use strict';
    var diff;
    finished = true;
    $('.timer_wrapper').remove();
    if (state === 'result') {
        return;
    }
    cstate('result');
    check_all_answers();
    $('#choices').empty();
    $('#question').empty();
    $('#total_count').html(_cfg.settings.question_count);
    $('#incorrect_count').html(count_incorrect_answers());
    $('#correct_count').html(count_correct_answers());
    $('#passing_score').html(_cfg.settings.passing_score);
    $('#score').html(get_score());
    $('#result').html(_cfg.settings.messages[get_result()]);
    if (_cfg.settings.finish_at_result_page) {
        finalize_scorm();
    }
    make_result_table('#result_table2');
    show('#page_result');
    if (!isIPhone && !isIPad && !isAndroid) {
        $('#result_table2').scrollbarTable(_cfg.settings.restartable ? (200 + change_page_scale_height) - (30 * _cfg.settings.scale - 30) : 230 + change_page_scale_height);
        $('#page_result .qtable').css('width', $('#result_table2').width() - 14);
        $('#page_result .student_response').find('div').css("width", $('#page_result .student_response').width() - 40);
        if (_cfg.settings.flexible_resultpage) {
            setInterval(function () {
                diff = $("#page_result .scrollbartable").children().height() - $("#page_result .scrollbartable").height();
                $("#page_result .scrollbartable").height($("#page_result .scrollbartable").children().height() + 20);
                $("#page_result").height($("#page_result").height() + diff + 20);
            }, 100);
        }
    }
    if (_cfg.settings.student_response_align) {
        $('#page_result .student_response').find('div').css("text-align", _cfg.settings.student_response_align);
    }
}
function count_correct_answers() {
    'use strict';
    var count = 0,
        i;
    for (i = 0; i < _cfg.settings.question_count; i++) {
        if (_cfg.questions[i].result === "correct") {
            count++;
        }
    }
    return count;
}
function count_incorrect_answers() {
    'use strict';
    var count = 0,
        i;
    for (i = 0; i < _cfg.settings.question_count; i++) {
        if (_cfg.questions[i].result === "incorrect") {
            count++;
        }
    }
    return count;
}
function get_score() {
    'use strict';
    return Math.round(count_correct_answers() / _cfg.settings.question_count * 100);
}
function get_scaled_score() {
    'use strict';
    return get_score() / 100;
}
function get_result() {
    'use strict';
    return get_score() >= _cfg.settings.passing_score ? 'passed' : 'failed';
}
function restart() {
    'use strict';
    location.reload();
}

/**
 * SCORM
 **/
var API, startTime;
function DummyAPI() {
    'use strict';
    this.Initialize     = function () {console_log("Initialize"); };
    this.Terminate         = function () {console_log("Terminate"); };
    this.Commit         = function () {console_log("Commit"); };
    this.SetValue        = function (key, value) {
        console_log("SetValue(" + key + ", " + value + ")");
        if (key === 'cmi.suspend_data') {
            storeCookie(key, value);
        }
    };
    this.GetValue = function (key) {
        console_log("GetValue(" + key + ")");
        if (key === 'cmi.suspend_data') {
            return loadCookie(key);
        }
    };
}
function WrapperAPI_12to2004(api12) {
    'use strict';
    this.Initialize = function (str) {
        return api12.LMSInitialize(str);
    };
    this.Terminate = function (str) {
        return api12.LMSFinish(str);
    };
    this.Commit = function (str) {
        return api12.LMSCommit(str);
    };
    this.SetValue = function (key, value) {
        return api12.LMSSetValue(key, value);
    };
    this.GetValue = function (key) {
        return api12.LMSGetValue(key);
    };
    this.GetLastError = function () {
        return api12.LMSGetLastError("");
    };
}
function storeCookie(cookie_name, value) {
    'use strict';
    var ex = new Date();
    ex.setHours(ex.getHours() + 24 * 365);
    ex = ex.toGMTString();
    document.cookie = escape(cookie_name) + "=" + escape(value) + ";expires=" + ex;
}
function loadCookie(loadValue) {
    'use strict';
    if (loadValue) {
        var c_data = unescape(document.cookie + ";"),
            n_point = c_data.indexOf(loadValue),
            v_point = c_data.indexOf("=", n_point) + 1,
            end_point = c_data.indexOf(";", n_point);
        if (n_point > -1) {
            c_data = c_data.substring(v_point, end_point);
            return c_data;
        }
    }
}
function init_scorm() {
    'use strict';
    var win1,
        win2;
    startTime = new Date().getTime();
    try {
        win1 = window;
        while (win1.API  == null && win1.parent != null && win1.parent != win1) {
            win1 = win1.parent;
        }
        win2 = window;
        while (win2.API_1484_11 == null && win2.parent != null && win2.parent != win2) {
            win2 = win2.parent;
        }
        if ((_cfg.settings.scorm === 'auto' || _cfg.settings.scorm === '1.2') && win1.API !== undefined) {
            API = new WrapperAPI_12to2004(win1.API);
            _cfg.settings.scorm = '1.2';
            console_log("SCORM 1.2 API found");
        } else if ((_cfg.settings.scorm === 'auto' || _cfg.settings.scorm === '2004') && win2.API_1484_11 !== undefined) {
            API = win2.API_1484_11;
            _cfg.settings.scorm = '2004';
            console_log("SCORM 2004 API found");
        } else {
            throw "No API Found";
        }
    } catch (e) {//No API Found or Cross Domain Exception(Firefox and Opera)
        API = new DummyAPI();
        _cfg.settings.scorm = 'dummy';
        console_log("SCORM API not found. DummyAPI loaded.");
    }
    API.Initialize("");
    if (_cfg.settings.scorm === '1.2') {
        setValue('cmi.core.lesson_status', 'incomplete');
    }
    if (_cfg.settings.scorm === '2004') {
        setValue('cmi.completion_status', 'incomplete');
    }
    $(window).unload(function () {finalize_scorm(); });
    try{
        load_suspend_data();
    }catch(e){
        console_log("Failed to load suspend data");
    }
}
function sendCommonInteractions(q, i) {
    'use strict';
    setValue('cmi.interactions.' + i + '.id', q.id);
    if (q.type === 'sa' || q.type === 'ma' || q.type === 'button') {
        setValue('cmi.interactions.' + i + '.type', 'choice');
    } else if (q.type === 'true-false') {
        setValue('cmi.interactions.' + i + '.type', 'true-false');
    } else if (q.type === 'fill-in') {
        setValue('cmi.interactions.' + i + '.type', 'fill-in');
    } else if (q.type === 'textarea') {
        setValue('cmi.interactions.' + i + '.type', 'fill-in');
    } else if (q.type === 'fill-in-plus') {
        setValue('cmi.interactions.' + i + '.type', 'fill-in');
    } else if (q.type === 'fill-in-multi') {
        setValue('cmi.interactions.' + i + '.type', 'fill-in');
    } else if (q.type === 'sort') {
        setValue('cmi.interactions.' + i + '.type', 'sequencing');
    } else if (q.type === 'match') {
        setValue('cmi.interactions.' + i + '.type', 'matching');
    } else if (q.type === 'wordbank') {
        setValue('cmi.interactions.' + i + '.type', 'matching');
    }
    setValue('cmi.interactions.' + i + '.weighting', '1');
    setValue('cmi.interactions.' + i + '.correct_responses.0.pattern', q.answer);
}
function finalize_scorm() {
    'use strict';
    var q,
        i = 0;
    if (API === null) {
        return;
    }
    check_all_answers();
    save_suspend_data();
    if (_cfg.settings.scorm === '1.2') {
        for (i = 0; i < _cfg.settings.question_count; i++) {
            q = _cfg.questions[i];
            sendCommonInteractions(q, i);
            setValue('cmi.interactions.' + i + '.student_response', q.student_response);
            if (!q.hasOwnProperty('time')) {
                q.time = getCurrentTimeForSCORM12();
            }
            setValue('cmi.interactions.' + i + '.time', q.time);
            setValue('cmi.interactions.' + i + '.result', scorm12[q.result]);
        }
        setValue('cmi.core.score.raw', get_score());
        setValue('cmi.core.score.min', '0');
        setValue('cmi.core.score.max', '100');
        setValue('cmi.core.lesson_status', get_result());
        setValue('cmi.core.session_time', formatTimeIntervalForSCORM12(new Date().getTime() - startTime));
    } else {
        for (i = 0; i < _cfg.settings.question_count; i++) {
            q = _cfg.questions[i];
            sendCommonInteractions(q, i);
            setValue('cmi.interactions.' + i + '.learner_response', q.student_response);
            if (!q.hasOwnProperty('time')) {
                q.time = getCurrentTimeForSCORM2004();
            }
            setValue('cmi.interactions.' + i + '.timestamp', q.time);
            setValue('cmi.interactions.' + i + '.result', scorm2004[q.result]);
        }
        setValue('cmi.score.scaled', get_scaled_score());
        setValue('cmi.success_status', get_result());
        setValue('cmi.completion_status', 'completed');
        setValue('cmi.session_time', formatTimeIntervalForSCORM2004(new Date().getTime() - startTime));
    }
    API.Terminate('');
    API = null;
}
function formatTimeIntervalForSCORM12(diff) {
    'use strict';
    var h, m, s;
    s = (diff - diff % 1000) / 1000;
    m = (s - s % 60) / 60;
    h = (m - m % 60) / 60;
    s = s - m * 60;
    m = m - h * 60;
    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }
    return h + ':' + m + ':' + s;
}
function formatTimeIntervalForSCORM2004(diff) {
    'use strict';
    return formatTimeIntervalForSCORM12(diff);
}
function setValue(key, value) {
    'use strict';
    if (typeof value === 'object') {
        API.SetValue(key, value.join(', '));
    } else if (value === undefined) {
        API.SetValue(key, '');
    } else {
        API.SetValue(key, String(value));
    }
}
function getValue(key) {
    'use strict';
    return API.GetValue(key);
}
function commit() {
    'use strict';
    if (API !== null) {
        API.Commit("");
    }
}
function getCurrentTimeForSCORM12() {
    'use strict';
    var ctime = new Date(),
        h = ctime.getHours(),
        m = ctime.getMinutes(),
        s = ctime.getSeconds();
    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }
    return h + ':' + m + ':' + s;
}
function getCurrentTimeForSCORM2004() {
    'use strict';
    return getCurrentTimeForSCORM12();
}

/**
 * Keyboard shortcut
 **/
window.document.onkeydown = function (e) {
    'use strict';
    e = e || window.event;
    var code = e.keyCode || e.which;
    if (code === 13) {
        if (state === 'quiz') {
            if (_cfg.settings.show_instant_result) {
                if ($(':focus').attr('id') !== 'check_answer_button') {
                    check_answer();
                    /*Ver3.0.3 IE対策 記述問題形式未入力でEnter時の動作対応*/
                    if ($(':focus').attr('id') !== 'check_answer_next_button' && $(':focus').attr('id') !== 'show_result') {
                        return false;
                    }
                }
            } else if (!_cfg.settings.movable) {
                if ($(':focus').attr('id') !== 'not_disp_answer_next_button' && $(':focus').attr('id') !== 'not_disp_answer_mark_button') {
                    check_choiced_next_quiz();
                }
            } else if (_cfg.settings.movable) {
                display_next_quiz();
            }
        } else if (state === 'intro') {
            start_quiz();
        }
    } else if (code >= 49 && code <= 57) {
        numkey(code - 48);
    } else if (code >= 97 && code <= 105) {
        numkey(code - 96);
    } else if (_cfg.settings.movable) {
        if (state === 'quiz' && ((cq.type !== 'fill-in' && cq.type !== 'fill-in-plus' && cq.type !== 'fill-in-multi' && cq.type !== 'textarea') || e.shiftKey || (cq.hasOwnProperty('result') && cq.result !== ''))) {
            if (code === 37) {
                display_prev_quiz();
            } else if (code === 39) {
                display_next_quiz();
            }
        }
    }
};
function numkey(num) {
    'use strict';
    if (state === 'quiz' && !cq.hasOwnProperty('result')) {
        if (num <= $(".choice input").length + $(".choice button").length || (cq.type === 'true-false' && num <= 2)) {
            if (cq.type === 'sa') {
                $(".choice input")[num - 1].checked = "checked";
            } else if (cq.type === 'ma') {
                $(".choice input")[num - 1].checked = !$(".choice input")[num - 1].checked;
            } else if (cq.type === 'button') {
                button_click(cq.choice[num - 1]);
            } else if (cq.type === 'true-false') {
                button_click(num === 1 ? 'true' : 'false');
            }
        }
    }
}
/**
 * Utility functions
 **/
var merge = function (p, q) {
        'use strict';
        var o = q,
            z;
        for (z in p) {
            if (p.hasOwnProperty(z)) {
                if (typeof p[z] === 'object' && typeof o[z] === 'object') {
                    o[z] = merge(p[z], o[z]);
                } else {
                    o[z] = p[z];
                }
            }
        }
        return o;
    },
    clone = function (obj) {
        'use strict';
        var F = function () {/*console_log('');*/ };//TODO
        F.prototype = obj;
        return new F();
    },
    htmlencode = function (s) {
        'use strict';
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },
    jsencode = function (s) {
        'use strict';
        return s.replace(/'/g, '\\\'');
    },
    qalert = function (msg) {
        'use strict';
        alert(msg);
    },
    console_log = function (msg) {
        'use strict';
        if (typeof console != 'undefined') {
            console.log(msg);
        }
    },
    wrap_div = function (str) {
        'use strict';
        return '<div>' + str + '</div>';
    },
    cstate = function (new_state) {
        'use strict';
        state = new_state;
    },
    show = function (sel) {
        'use strict';
        $('.page').hide();
        $(sel).fadeIn(0);
    };

Array.prototype.shuffle = function () {
    'use strict';
    var i = this.length,
        j,
        t;
    while (i) {
        j = Math.floor(Math.random() * i);
        t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
};
$.extend({
    loadStyle: function (_p) {
        'use strict';
        var p = $.extend({
            ua: false,
            common: false,
            landscape: false,
            portrait: false,
            width: false,
            height: false
        }, _p),
            getTag = function (h, m) {
                var tag = document.createElement("link");
                tag.href = h;
                tag.media = m;
                tag.type = "text/css";
                tag.rel = "stylesheet";
                return tag;
            };
        if (!p.ua || p.ua.test(navigator.userAgent)) {
            if (!p.width || p.width === screen.width) {
                if (!p.height || p.height === screen.height) {
                    if (p.common) {
                        $("head").append(getTag(p.common, "all"));
                    }
                    if (p.landscape) {
                        $("head").append(getTag(p.landscape, "all and (orientation:landscape)"));
                    }
                    if (p.portrait) {
                        $("head").append(getTag(p.portrait, "all and (orientation:portrait)"));
                    }
                    return true;
                }
            }
        }
        return false;
    }
});

var myListener = {};
myListener.onInit = function () {
    'use strict';
};
function _getFlashObject() {
    'use strict';
    return document.getElementById("myFlash");
}
function play($file) {
    'use strict';
    try {
        _getFlashObject().SetVariable("method:setUrl", $file);
        _getFlashObject().SetVariable("method:play", "");
    } catch (e) {
        console_log('error: loading flash');
    }
}
function pause() {
    'use strict';
    _getFlashObject().SetVariable("method:pause", "");
}
function stop() {
    'use strict';
    _getFlashObject().SetVariable("method:stop", "");
}

/*************************************
 * 追加形式(sort,match,wordbank)用関数
 *************************************/
function setDivHeight() {
    'use strict';
    var max_height = 0,
        max_outerHeight,
        connection_height;
    if (cq.type === 'sort') {
        $(".drag-choice").each(function () {
            if (max_height < $(this).height()) {
                max_height =  $(this).height();
            }
        });
        $(".drag-choice").each(function () {
            $(this).height(max_height);
        });
    } else if (cq.type === 'match') {
        max_outerHeight = $(".drop-choice-key").eq(0).outerHeight();
        connection_height = $(".match-connection").eq(0).css("border-bottom-width").replace("px", "");
        $(".drop-choice,.drop-choice-key").each(function () {
            if (max_height < $(this).height()) {
                max_height =  $(this).height();
                max_outerHeight = $(this).outerHeight();
            }
        });
        $(".drag-choice,.drop-choice-key").each(function () {
            $(this).height(max_height);
        });
        $(".match-connection").each(function () {
            $(this).css("top", (max_outerHeight - connection_height) / 2);
        });
    }
}
function setDragDropEvent() {
    'use strict';
    var dragObject,
        changeLi,
        former_list;
    if (cq.type !== 'wordbank') {
        dragObject = $(".drag-choice");
    } else {
        dragObject = $(".drag-choice-wordbank");
    }
    dragObject.each(function () {
        $(this).draggable({
            revert: true,
            revertDuration: 100,
            start: function () {
                $(this).css("z-index", "1000");
                $(this).addClass("list-hover");
            },
            stop: function () {
                $(this).css("z-index", "");
                $(this).removeClass("list-hover");
            }
        });
        $(this).hover(function () {
            $(this).addClass("list-hover");
            dragObject.not(this).removeClass("list-hover");
        }, function () {
            if (!$(this).hasClass("ui-draggable-dragging")) {
                $(this).removeClass("list-hover");
            }
        });
    });
    if (cq.type === 'wordbank') {
        $(".drop-choice-wordbank").each(function () {
            $(this).droppable({
                hoverClass: "drop-hover",
                drop: function (event, ui) {
                    if ($(this).children().length === 1) {
                        if (ui.draggable.parents(".drop-choice-wordbank").length === 1) {
                            ui.draggable.prevAll(".wordbank-key").css("display", "inline-block");
                            ui.draggable.appendTo(this);
                            $(this).find(".wordbank-key").css("display", "none");
                        } else {
                            ui.draggable.parent("#choices .drop-choice-list").css("display", "none");
                            ui.draggable.appendTo(this);
                            $(this).find(".wordbank-key").css("display", "none");
                        }
                    } else {
                        if (ui.draggable.parents(".drop-choice-wordbank").length === 1) {
                            ui.draggable.after($(this).find(".drag-choice-wordbank"));
                            ui.draggable.appendTo(this);
                        } else {
                            changeLi = $(this).find(".drag-choice-wordbank");
                            $("#choices .drop-choice-list").eq(changeLi.find(".drop-index").text()).css("display", "inline-block");
                            $("#choices .drop-choice-list").eq(changeLi.find(".drop-index").text()).append(changeLi);
                            ui.draggable.parent("#choices .drop-choice-list").css("display", "none");
                            ui.draggable.appendTo(this);
                        }
                    }
                    ui.draggable.css("left", "");
                    ui.draggable.css("top", "");
                    play_dragged_sound();
                }
            });
        });
        $("#choices").droppable({
            drop: function (event, ui) {
                ui.draggable.prevAll(".wordbank-key").css("display", "inline-block");
                $("#choices .drop-choice-list").eq(ui.draggable.find(".drop-index").text()).css("display", "inline-block");
                $("#choices .drop-choice-list").eq(ui.draggable.find(".drop-index").text()).append(ui.draggable);
                ui.draggable.css("left", "");
                ui.draggable.css("top", "");
                play_dragged_sound();
            }
        });
    } else {
        $(".drop-choice").each(function () {
            $(this).droppable({
                hoverClass: "drop-hover",
                drop: function (event, ui) {
                    $(this).find("li").removeClass("list-hover");
                    former_list = $(this).find("li");
                    ui.draggable.after($(this).find("li"));
                    $(this).append(ui.draggable);
                    ui.draggable.css("left", "");
                    ui.draggable.css("top", "");
                    change_sort_flg = true;
                    changelist_animation(ui.draggable, former_list);
                    play_dragged_sound();
                }
            });
        });
    }
}
function setDragDropList() {
    'use strict';
    var template,
        displist,
        choice_value,
        choice_html,
        i;
    if (cq.type === 'sort') {
        template = sort_template;
    } else if (cq.type === 'match') {
        template = match_template;
    }
    if (cq.student_response && cq.student_response.length > 0) {
        change_sort_flg = true;
        displist = cq.student_response;
    } else {
        change_sort_flg = false;
        displist = cq.choice;
    }
    for (i = 0; i < displist.length; i++) {
        choice_value = displist[i];
        choice_html = template;
        choice_html = choice_html.replace(/\[\[choice\]\]/g, choice_value);
        if (cq.type === 'match') {
            choice_html = choice_html.replace(/\[\[match_key\]\]/g, cq.match_key[i]);
            choice_html = choice_html.replace(/\[\[choice_id\]\]/g, 'choice_' + i);
        }
        choice_html = choice_html.replace(/\[\[choice_key\]\]/g, htmlencode(displist[i]));
        choice_html = '<div class="choice">' + choice_html + '</div>';
        $('#choices').append(choice_html);
    }
}
function setDivWidth() {
    'use strict';
    var max_width = 0;
    $(".drag-choice-wordbank").each(function () {
        if (max_width < $(this).width() && $(this).children(".disp_correct").length === 0) {
            max_width = $(this).width();
        }
    });
    if (max_width < 50) {
        max_width = 50;
    }
    $(".drop-choice-wordbank,.drag-choice-wordbank").each(function () {
        $(this).css("min-width", max_width);
    });
    //IE9対策
    $("#question").css("display", "none");
    $("#question").css("display", "block");
}

function disableDragDrop(dragobj, dropobj) {
    'use strict';
    dragobj.each(function () {
        $(this).draggable('disable');
        $(this).unbind("mouseenter").unbind("mouseleave");
    });
    dropobj.each(function () {
        $(this).droppable('disable');
    });

}
function is_shuffle(a1, a2) {
    'use strict';
    var i;
    for (i = 1; i < a1.length; i++) {
        if (a1[0] !== a1[i]) {
            break;
        }
        if (i === a1.length - 1) {
            return true;
        }
    }
    for (i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) {
            break;
        }
        if (i === a1.length - 1) {
            return false;
        }
    }
    return true;
}
function changelist_animation(list1, list2) {
    'use strict';
    list1.css("left", "20px");
    list2.css("left", "20px");
    list1.animate({
        left: "0px"
    }, 100);
    list2.animate({
        left: "0px"
    }, 100);
    setTimeout(function () {list1.css("background-color", "white"); }, 100);
    setTimeout(function () {list1.css("background-color", ""); }, 300);
    setTimeout(function () {list2.css("background-color", "white"); }, 100);
    setTimeout(function () {list2.css("background-color", ""); }, 300);
}