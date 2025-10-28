const { OpenAI } = require('openai');

// 请将这里的 'YOUR_REAL_API_KEY' 替换为你真实的 OpenAI API 密钥
const openai = new OpenAI({
    apiKey: '5bd4d244-e6d2-452b-9e5d-790d64160589',
    baseURL: 'https://ark.cn-beijing.volces.com/api/v3'
});

async function main() {
    // Non-streaming:
    console.log('----- standard request -----');
    const completion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: '你是豆包，是由字节跳动开发的 AI 人工智能助手' },
            { role: 'user', content: '四川好玩的景点有哪些' }
        ],
        model: 'ep-20241220092004-rdxsd'
    });
    console.log(completion.choices[0]?.message?.content);

    // Streaming:
    console.log('----- streaming request -----');
    const stream = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: '你是一个ai智能旅游向导' },
            { role: 'user', content: '四川好玩的景点有哪些' }
        ],
        model: 'ep-20241220092004-rdxsd',
        stream: true
    });
    for await (const part of stream) {
        process.stdout.write(part.choices[0]?.delta?.content || '');
    }
    process.stdout.write('\n');
}

main();