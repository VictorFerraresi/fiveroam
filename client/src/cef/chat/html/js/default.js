// Settings
var _MAX_MESSAGES_ON_CHAT = 10;
var _HIDE_INPUT_BAR_ON_BLUR = true;
var _MAX_INPUT_HISTORIES = 5;
var _FONT_SIZE = "1rem";
var _TIMESTAMP_ENABLED = false;
var _ROLEPLAY_MODE_ENABLED = false;
var _MAX_INPUT_LENGHT = 150;

// Data
var chatActive = false;
var inputActive = false;

// Input History
var inputHistory = [];
var inputHistoryCurrent;
var inputHistoryCache;

// Elements
var chatBox = $(".chat-box");
var chatMessagesList = $(".chat-box .chat-messages-list");
var chatInputBar = $(".chat-box .chat-input-bar");
var chatInputBarLength = $(".chat-box .chat-input-bar-length");
var chatNewMessagesWarning = $(".chat-box .chat-new-messages-warning");

// Initiation
$(document).ready(() => {
  const messagesListHeight = _MAX_MESSAGES_ON_CHAT * 22;
  const chatBoxHeight = messagesListHeight + 50;

  chatBox.css("height", chatBoxHeight + "px");
  chatMessagesList.css("height", messagesListHeight + "px");

  alt.emit("chat:onLoaded");
});
if (_HIDE_INPUT_BAR_ON_BLUR)
  $(chatInputBar).focusout(() => inputActive && activateInput(false));
chatInputBar.bind(
  "propertychange change click keyup input paste",
  () =>
    inputActive && setInputBarLengthCounterCurrent(chatInputBar.val().length)
);

function clearMessages() {
  chatMessagesList.html("");
}

// Functions - Actions
function pushMessage(
  text,
  color = "white",
  gradient = false,
  icon = false,
  isRoleplay = false
) {
  if (text.length < 1) return;
  if (gradient != false && Array.isArray(gradient) === false) return;

  let style = `color:${color};`;
  style += `font-size:${_FONT_SIZE};`;

  if (gradient)
    style += `background:linear-gradient(90deg,rgba(${[
      gradient[0],
      gradient[1],
      gradient[2],
    ]},0.3) 0%, rgba(255,255,255,0) 100%);`;

  if (icon && icon != "false")
    text = `<i class="fi-${icon}" style="padding:0 2px 0 2px"></i> ` + text;

  text = text
    .replace(
      /<color:(#[A-Za-z0-9]{6})>/g,
      `<span style="color:$1; font-size:${_FONT_SIZE}">`
    )
    .replace(/<\/color>/g, "</span>");

  const date = new Date();
  const dateString = `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
  let timestamp;

  if (_TIMESTAMP_ENABLED) {
    timestamp = `<span class="timestamp" style="display: inline; font-size:${_FONT_SIZE};">[${dateString}]</span>`;
  } else {
    timestamp = `<span class="timestamp" style="font-size:${_FONT_SIZE};">[${dateString}]</span>`;
  }

  chatMessagesList.append(
    `<div class="chat-message stroke" style="${style};display:${
      !isRoleplay && _ROLEPLAY_MODE_ENABLED ? "none" : "inline"
    }" data-isRoleplay="${isRoleplay}">${timestamp} ${text}</div>`
  );

  // Check if player's chat is scrolled all the way to the bottom. If true, then scroll down for new message to appear,
  // if false, inform player about new message(s).
  getScrolledUpMessagesAmount() >= 4
    ? toggleWarningText(true)
    : scrollMessagesList("bottom");

  const chatLog = text
    .replace(/<.+?>/g, "")
    .replace(/<\/.+>/g, "")
    .trim();
  console.log(`chat_log: ${chatLog}`);
}

function sanitizeHTML(html) {
  const tagBody = "(?:[^\"'>]|\"[^\"]*\"|'[^']*')*";
  const tagOrComment = new RegExp(
    "<(?:" +
      // Comment body.
      "!--(?:(?:-*[^->])*--+|-?)" +
      // Special "raw text" elements whose content should be elided.
      "|script\\b" +
      tagBody +
      ">[\\s\\S]*?</script\\s*" +
      "|style\\b" +
      tagBody +
      ">[\\s\\S]*?</style\\s*" +
      // Regular name
      "|/?[a-z]" +
      tagBody +
      ")>",
    "gi"
  );
  let oldHtml;
  do {
    oldHtml = html;
    html = html.replace(tagOrComment, "");
  } while (html !== oldHtml);
  return html.replace(/</g, "&lt;");
}

function scrollMessagesList(direction) {
  const pixels = 22 * 5;

  switch (direction) {
    case "up":
      chatMessagesList.stop().animate({ scrollTop: `-=${pixels}px` }, 250);
      break;
    case "down":
      chatMessagesList.stop().animate({ scrollTop: `+=${pixels}px` }, 250);
      break;
    case "bottom":
      chatMessagesList
        .stop()
        .animate({ scrollTop: chatMessagesList.prop("scrollHeight") }, 0);
      break;
  }

  setTimeout(() => {
    if (getScrolledUpMessagesAmount() == 0) toggleWarningText(false);
  }, 250);
}

function activateChat(state) {
  chatActive = state;
  state ? chatBox.removeClass("hide") : chatBox.addClass("hide");

  alt.emit("chat:onChatStateChange", state);
}

function activateInput(state, keepPlayerControls = false) {
  inputActive = state;

  // Restart Input Bar Length Counter
  setInputBarLengthCounterCurrent(0);

  // Restart Input History
  inputHistoryCache = "";
  inputHistoryCurrent = inputHistory.length;

  switch (state) {
    case true:
      chatInputBarLength.removeClass("hide");
      chatInputBar.removeClass("hide");
      setTimeout(() => chatInputBar.focus(), 5);
      enableScroll();
      break;
    case false:
      chatInputBarLength.addClass("hide");
      chatInputBar.addClass("hide");
      chatInputBar.blur();
      scrollMessagesList("bottom");
      disableScroll();
      break;
  }

  alt.emit("chat:onInputStateChange", state, keepPlayerControls);
}

function sendInput() {
  const length = chatInputBar.val().length;
  if (length > 0) {
    const sanitizedInputed = sanitizeHTML(chatInputBar.val());
    alt.emit("chat:onInput", sanitizedInputed);
    addInputToHistory(sanitizedInputed);
    chatInputBar.val("");
  }
  activateInput(false);
}

function addInputToHistory(input) {
  // If history list have max amount of inputs, start deleting them from the beginning
  if (inputHistory.length >= _MAX_INPUT_HISTORIES) inputHistory.shift();

  // Add input to history list
  inputHistory.push(input);
}

function shiftHistoryUp() {
  let current = inputHistoryCurrent;
  if (inputHistoryCurrent == inputHistory.length)
    inputHistoryCache = chatInputBar.val();

  if (current > 0) {
    inputHistoryCurrent--;
    chatInputBar.val(inputHistory[inputHistoryCurrent]);
  }
}

function shiftHistoryDown() {
  if (inputHistoryCurrent == inputHistory.length) return;
  if (inputHistoryCurrent < inputHistory.length - 1) {
    inputHistoryCurrent++;
    chatInputBar.val(inputHistory[inputHistoryCurrent]);
  } else {
    inputHistoryCurrent = inputHistory.length;
    chatInputBar.val(inputHistoryCache);
  }
}

function toggleWarningText(state) {
  switch (state) {
    case true:
      chatNewMessagesWarning.removeClass("animated-hide");
      break;
    case false:
      chatNewMessagesWarning.addClass("animated-hide");
      break;
  }
}

function setInputBarLengthCounterCurrent(amount) {
  const text = chatInputBar.val();
  if (text.length >= _MAX_INPUT_LENGHT)
    chatInputBar.val(text.substring(0, _MAX_INPUT_LENGHT));

  if (amount < 100) {
    chatInputBarLength.addClass("counter-color-white");
    chatInputBarLength.removeClass("counter-color-yellow");
    chatInputBarLength.removeClass("counter-color-red");
  } else if (amount < 125) {
    chatInputBarLength.removeClass("counter-color-white");
    chatInputBarLength.addClass("counter-color-yellow");
    chatInputBarLength.removeClass("counter-color-red");
  } else {
    chatInputBarLength.removeClass("counter-color-white");
    chatInputBarLength.removeClass("counter-color-yellow");
    chatInputBarLength.addClass("counter-color-red");
  }

  chatInputBarLength.html(
    `<i class="fi-pencil" style="padding-right:2px"></i>${Math.min(
      amount,
      _MAX_INPUT_LENGHT
    )}/${_MAX_INPUT_LENGHT}`
  );
}

function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

function breakLines(text, lineLength) {
  if (text.length <= lineLength) return [text];

  let lineCount = Math.ceil(text.length / lineLength);
  let lines = [];

  let cursor = 0;
  for (let i = 0; i < lineCount; i++) {
    let sliceAt = cursor + lineLength - 1;

    // If line would break word in half, send word to next line
    if (text[sliceAt] != " ") {
      let indexOfNextSpace = text.substring(sliceAt).indexOf(" ");

      if (indexOfNextSpace != -1) {
        sliceAt += indexOfNextSpace;
      }
    }

    lines.push(text.substring(cursor, sliceAt));

    cursor = sliceAt;
  }

  lines = lines.filter((l) => l.length > 0).map((l) => l.trim());

  return lines;
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var scrollKeys = { 32: 1, 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (scrollKeys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// Functions - Checks

function getScrolledUpMessagesAmount() {
  const amount = Math.round(
    (chatMessagesList.prop("scrollHeight") -
      chatMessagesList.scrollTop() -
      _MAX_MESSAGES_ON_CHAT * 22) /
      22
  );
  return amount > 0 ? amount : 0;
}

function changePageSize(size) {
  _MAX_MESSAGES_ON_CHAT = size;

  const messagesListHeight = _MAX_MESSAGES_ON_CHAT * 22;
  const chatBoxHeight = messagesListHeight + 50;

  chatBox.css("height", chatBoxHeight + "px");
  chatMessagesList.css("height", messagesListHeight + "px");
}

function changeFontSize(size) {
  switch (size) {
    case -3:
      _FONT_SIZE = ".7rem";
      break;
    case -2:
      _FONT_SIZE = ".8rem";
      break;
    case -1:
      _FONT_SIZE = ".9rem";
      break;
    case 0:
      _FONT_SIZE = "1rem";
      break;
    case 1:
      _FONT_SIZE = "1.1rem";
      break;
    case 2:
      _FONT_SIZE = "1.2rem";
      break;
    case 3:
      _FONT_SIZE = "1.3rem";
      break;
    case 4:
      _FONT_SIZE = "1.4rem";
      break;
    case 5:
      _FONT_SIZE = "1.5rem";
      break;
  }

  $(".chat-message").css("font-size", _FONT_SIZE);
  $(".chat-message span").css("font-size", _FONT_SIZE);
  $(".timestamp").css("font-size", _FONT_SIZE);
}

function toggleTimestamp(toggle) {
  _TIMESTAMP_ENABLED = toggle;
  $(".timestamp").css("display", 1 == _TIMESTAMP_ENABLED ? "inline" : "none");
}

function toggleRoleplay() {
  _ROLEPLAY_MODE_ENABLED = !_ROLEPLAY_MODE_ENABLED;
  $('.chat-message[data-isRoleplay="false"]').css(
    "display",
    _ROLEPLAY_MODE_ENABLED ? "none" : "inline"
  );
  scrollMessagesList("bottom");
}

// alt:V - Callbacks
alt.on("chat:clearMessages", clearMessages);
alt.on("chat:pushMessage", pushMessage);
alt.on("chat:activateChat", activateChat);
alt.on("chat:activateInput", activateInput);
alt.on("chat:sendInput", sendInput);
alt.on("chat:scrollMessagesList", scrollMessagesList);
alt.on("chat:addInputToHistory", addInputToHistory);
alt.on("chat:shiftHistoryUp", shiftHistoryUp);
alt.on("chat:shiftHistoryDown", shiftHistoryDown);
alt.on("chat:changePageSize", changePageSize);
alt.on("chat:changeFontSize", changeFontSize);
alt.on("chat:toggleTimestamp", toggleTimestamp);
alt.on("chat:toggleRoleplayMode", toggleRoleplay);
