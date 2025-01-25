import fs from 'fs';
import path from 'path';
import extract from 'extract-zip';
import { parse } from 'fast-csv';
import { db } from '../db/db';
import { ramenRatings } from '../db/schema';

async function extractAndImport() {
  const zipFilePath = path.resolve(__dirname, '../../ramen-ratings.zip');
  const extractDir = path.resolve(__dirname, '../extracted');

  // Ensure the extraction directory exists
  if (!fs.existsSync(extractDir)) {
    fs.mkdirSync(extractDir);
  }

  // Extract the ZIP file
  try {
    await extract(zipFilePath, { dir: extractDir });
    console.log('Extraction complete.');
  } catch (err) {
    console.error('Error during extraction:', err);
    return;
  }

  // Locate the extracted CSV file
  const files = fs.readdirSync(extractDir);
  const csvFile = files.find((file) => file.endsWith('.csv'));

  if (!csvFile) {
    console.error('No CSV file found in the extracted contents.');
    return;
  }

  const csvFilePath = path.join(extractDir, csvFile);

  // Parse and import the CSV data
  const csvData: any[] = [];
  const stream = fs.createReadStream(csvFilePath);

  const csvStream = parse({ headers: true })
    .on('data', (row) => {
      csvData.push(row);
    })
    .on('end', async () => {
      try {
        for (const row of csvData) {
          const { name, rating, review_date } = row;
          await db.insert(ramenRatings).values({
            name,
            rating: parseInt(rating, 10),
            reviewDate: new Date(review_date),
          });
        }
        console.log('Data import completed successfully.');
      } catch (err) {
        console.error('Error inserting data:', err);
      }
    });

  stream.pipe(csvStream);
}

extractAndImport();
