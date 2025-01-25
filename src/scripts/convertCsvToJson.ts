import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { fileURLToPath } from 'url';

// If you're in an ES module context, define __filename/__dirname:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertCsvToJson() {
  try {
    // CSV input file
    const csvFilePath = path.join(__dirname, '..', '..', 'ramen-ratings.csv'); // Where we’ll write our output JSON
    const outFilePath = path.join(__dirname, '..', 'ramenData.json');

    const records: any[] = [];

    // Pipe from file stream → csv-parse
    const parser = fs
      .createReadStream(csvFilePath)
      .pipe(parse({ columns: true, trim: true }));

    for await (const row of parser) {
      // Convert the CSV columns into your desired JSON shape
      const reviewVal = parseInt(row['Review #'], 10);
      const brandVal = row['Brand'];
      const varietyVal = row['Variety'];
      const styleVal = row['Style'];
      const countryVal = row['Country'];

      // Convert "Stars" → number or null
      let starsVal: number | null = null;
      if (row['Stars'] && row['Stars'].trim().toLowerCase() !== 'unrated') {
        starsVal = parseFloat(row['Stars']);
      }

      // Clean up "Top Ten" field
      const topTenVal = row['Top Ten']?.trim() || null;

      // Create an object for this row
      const ramenObj = {
        review: reviewVal,
        brand: brandVal,
        variety: varietyVal,
        style: styleVal,
        country: countryVal,
        stars: starsVal,
        topTen: topTenVal,
      };

      // Push into our `records` array
      records.push(ramenObj);
    }

    // Write the array of objects to ramenData.json
    fs.writeFileSync(outFilePath, JSON.stringify(records, null, 2), 'utf8');
    console.log(`✅ CSV successfully converted -> ${outFilePath}`);
  } catch (err) {
    console.error('❌ CSV to JSON conversion failed:', err);
    process.exit(1);
  }
}

convertCsvToJson();
