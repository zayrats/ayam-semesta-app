import auth from '../../middleware/auth';

export default function handler(req, res) {
  auth(req, res, async () => {
    try {
      // Misalkan endpoint ini mendapatkan data pengguna dari database
      const userId = req.user.id;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Kembalikan data pengguna
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}
