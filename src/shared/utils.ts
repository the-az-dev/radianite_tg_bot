import { adminTypes, chatTypes, personalChatType } from "./constants";

const isGroup = (chatType) => {
    return chatTypes.includes(chatType);
}

const isPrivateChat = (chatType) => {
    return personalChatType.includes(chatType);
}

const isAdmin = (member) => {
    return adminTypes.includes(member.status);
}

const parseDuration = (str) => {
  const match = str.match(/(\d+)([smhd])/)
  if (!match) return null

  const num = parseInt(match[1])
  const unit = match[2]

  switch (unit) {
    case 's': return num
    case 'm': return num * 60
    case 'h': return num * 60 * 60
    case 'd': return num * 60 * 60 * 24
    default: return null
  }
}

export {
    isGroup,
    isPrivateChat,
    isAdmin,
    parseDuration
};