import {getRootDomain} from "../scripts/functions";

describe('Domain Retrieval', () => {
    it('Domains can be retrieved for any tld', () => {
        const data = [
            {input: 'https://google.com', output: 'google.com'},
            {input: 'https://apple.com', output: 'apple.com'},
            {input: 'https://facebook.com', output: 'facebook.com'},
            {input: 'https://google.com.cy', output: 'google.com.cy'},
            {input: 'https://google.com.cy/test/gfdsgfd?sdfdsf%fgds', output: 'google.com.cy'},
            {input: 'https://google', output: null},
            {input: 'chrome://extensions', output: null},
            {input: 'edge://extensions', output: null},
            {input: 'chrome://config', output: null},
            {input: 'edge://config', output: null},
            {input: null, output: null},
        ];

        data.forEach(testRow => {
            let output;
            try {
                output = getRootDomain(testRow.input);
            } catch (e) {
                console.error(e)
                throw new Error('Unable to parse ' + testRow.input)
            }
            expect(output).toBe(testRow.output);
        });
    });
});
