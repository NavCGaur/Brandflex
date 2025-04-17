import admin from 'firebase-admin';
import mongoose from 'mongoose';
import { UserSchema } from '../models/userSchema.js'; // your UserSchema

import dotenv from 'dotenv';
dotenv.config();

// Initialize MongoDB connection
mongoose.connect('mongodb+srv://naveen:naveen%4024@cluster0.lmfml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
const User = mongoose.model('User', UserSchema, 'brandflexusers');




if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "brandflex-e89fb",
      clientEmail: 'firebase-adminsdk-fbsvc@brandflex-e89fb.iam.gserviceaccount.com',
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDeDei/q2Z1VqGq\npxYwwwdzYhgn/HlFWKj5RUSZVBPt+6E/J1XfB5vonOoXEm77+8hZ8T2Pd60d59Wq\nVREGYXU9UX2jN8J6ofD0lwIeeTKFMGFIRNdfgSdcayDCZzW4nf36/426Vx0rLD2H\ndKLioJlfKwNXBu32ShM7pYG4X6N8hB1+o8EdLneEiU01GXxeLIBQYs3uz3KTw56n\n8xCn8TVFgLmnNsl8FzEmzRSA+RrVsfJoPLdfSHAD8r06bTCdaucx0/t01nNgpHR1\nwGjXaiLtG8EGoREOVl193QCTKQvy1//PW+6amD/mwlN6d7w8NFCH5J7DgJ63yh2A\n9+Ll5QwfAgMBAAECggEADN3mdjDC25q8/Gv5I7MxW9S7zJlbF5MXG3aRjobqLriN\nc+DeH3HL7XMmN1cImk5RIjER3Z3UKK712Qxb07BTAE4YBxykhsGaejnD1Cs2q7QN\ndwgSKMUNmFPWzpz3Zm61OFWVi04f8Q/7sr0l8RbYPET8SQ8sO8C4E5U4Cox0JzNO\n6ZqrfmmVUoptMvyDWrSKWUCbNu0M28UJmlxGXPeZPBk/P3voAfWDIH5aPVGNPGK/\nJlkmUQVEpfbkAHzH6akvOMsq2U/0gUcVh8jW2w/b21MVMq7SQY3RKbH+u13u8B/s\nUZnWh0Z7zk3J4lt803nvoz5yqPyMl+BJ6YKZjSPujQKBgQD9XBylsctp0m7/xLkZ\nJBH+3nxqO7t4acuZ4VIMZTZ/+p9j553/+81BbRtIHmIE8z5dF2nbLD5SJ6xu4OS8\nqQOLHAfR2vSlwqJs23LmhlaDzUtTBL4eFF6UwCO+5UJzSVE1G9IFPIP3H9Hmj1bT\nvdNlYGzlq4PWAOp++z3+SMh60wKBgQDgXkib3nSQovxJotIXCStBC8XML+icks19\nYlxXdyU07N/UGRxPW7dOz4mja5qWWAVChsR02BgPSJq1iIAq+/srjKdYdFAJD0Fg\nfs6g9mRaljqR0cCj4D64si94Ql3C9bZa9olUce510rrjFU3K74NkfCqCFtxrp/MV\nA40gdccCBQKBgF1al2OmQ2FWnHe5sMpGtCrJJ+as48LWmKK2l1jh4lb9rcVODrXH\nvjWhUjAcodlZF12Nxv9vKfdzjuG8FAw/6oJTbb4xg3ugX+Dka03tqeseteZ9FOBY\neREuSv2H1BhOp5F+EsDDL4zbOKhPoJqck0wDX5ywuf8cj0sCoDEV+GjpAoGABew3\nOnYa2Z6TzlXP+e+yBpuK8yLonwl5BzBLg7uPbeA64FxxVN707c2osnmqsQFN0j3A\nfd0edXjTLKuXxoq0TKf/2uPnIPYYIbX3OmSGraV9kk/ZJ/pJbZK2khQeaYEW+Tu8\n0E/ZnZ6cdFYhoZPFAigM7zYvR2A9mHZpiUvSnwkCgYBQAuGuPq+VYfof3il06u3o\n66TZebGEvQKxU99ORxdaPfDHZYgMzdD+Wk48GH/o9/QJL6byfeYNufbFga6cH4ll\no4HL4EyGYPxdlVTWilX9Jr9icVEtq3o8yWJLUMI/EEhKAyWDgq5XRMTqSG9mEaFd\nspaJoLw/eqetYB8QGAcDqw==\n-----END PRIVATE KEY-----\n"?.replace(/\\n/g, '\n')
    })
  });
}


const rolesHierarchy = {
  Superadmin: ['Admin', 'Reseller', 'Agency', 'Client'],
  Admin: ['Reseller', 'Agency', 'Client'],
  Reseller: ['Agency', 'Client'],
  Agency: ['Client'],
  Client: []
};

async function createUserWithRole(email, role, parentId = null) {
  const userRecord = await admin.auth().createUser({
    email,
    password: 'Test1234!', // simple for dev use
    displayName: `${role} ${email.split('@')[0]}`
  });

  const mongoUser = new User({
    uid: userRecord.uid,
    email: userRecord.email,
    displayName: userRecord.displayName,
    role,
    parentId
  });

  await mongoUser.save();
  return mongoUser;
}

async function createHierarchy() {
  //const superAdmin = await createUserWithRole("superadmin@example.com", "Superadmin");

  const admin = await createUserWithRole("admin1@example.com", "Admin", 'ZCIiUB3ZnWT0hShBNxfXQNNV6xb2');
  const reseller = await createUserWithRole("reseller1@example.com", "Reseller", 'ZCIiUB3ZnWT0hShBNxfXQNNV6xb2');
  const agency = await createUserWithRole("agency1@example.com", "Agency", admin._id);
  const client1 = await createUserWithRole("client11@example.com", "Client", agency._id);
  const client2 = await createUserWithRole("client21@example.com", "Client", reseller._id);

  console.log("Dummy users created.");
}

createHierarchy()
  .then(() => mongoose.disconnect())
  .catch(err => console.error(err));
