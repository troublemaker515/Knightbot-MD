async function pickCommand(sock, chatId, msg, match) {
    try {
        // 1. Check if the user provided a trait (e.g., .pick smartest)
        if (!match) {
            return await sock.sendMessage(chatId, { text: "*Which type of User you want?*" });
        }

        // 2. Get group metadata and participants
        const groupMetadata = await sock.groupMetadata(chatId);
        const participants = groupMetadata.participants.map(v => v.id);

        // 3. Select a random participant
        const pick = participants[Math.floor(Math.random() * participants.length)];

        // 4. Format the response with a mention
        const mention = '@' + pick.split('@')[0];

        await sock.sendMessage(chatId, {
            text: `The most ${match} around us is ${mention}`,
            mentions: [pick]
        }, { quoted: msg });

    } catch (error) {
        console.error('Error in pick command:', error);
        await sock.sendMessage(chatId, { text: '❌ Error! Make sure I am in a group.' });
    }
}

module.exports = pickCommand;
