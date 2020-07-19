const {scrapeSweetMariasWebsiteForData} = require('./coffee.js');

test('scraping', (done) => {
    scrapeSweetMariasWebsiteForData({testing: true}).then((data) => {
        try {
            expect(data).not.toBeNull();
            expect(data.length).toBeGreaterThan(1);
            expect(data[0].score).toBeGreaterThan(50);
            done();
        } catch (error) {
            done(error);
        }
    });
});