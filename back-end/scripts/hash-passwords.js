import 'dotenv/config';
import { connectDb } from '../config/db.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

async function run() {
  await connectDb();
  console.log('Connected to DB — starting password migration');

  const users = await User.find();
  let updated = 0;

  for (const u of users) {
    const pw = u.password || '';
    if (!pw.startsWith('$2')) { // not a bcrypt hash
      const hashed = bcrypt.hashSync(pw, 10);
      u.password = hashed;
      await u.save();
      updated++;
      console.log(`Updated user ${u._id} (${u.email})`);
    } else {
      console.log(`Skipping user ${u._id} (${u.email}) — already hashed`);
    }
  }

  console.log(`Done. Updated ${updated} user(s).`);
  process.exit(0);
}

run().catch((err) => {
  console.error('Migration failed', err);
  process.exit(1);
});
