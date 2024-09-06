const firestore = {
  collection: jest.fn().mockReturnThis(),
  doc: jest.fn().mockReturnThis(),
  collectionGroup: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  get: jest.fn().mockResolvedValue({
    empty: false,
    docs: [
      { id: "conversation1", data: () => ({ title: "Conversation 1" }) },
      { id: "conversation2", data: () => ({ title: "Conversation 2" }) },
    ],
  }),
  set: jest.fn(),
};

const auth = {
  verifyIdToken: jest.fn(),
};

export default {
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
  auth: jest.fn(() => auth),
  firestore: jest.fn(() => firestore),
};
