require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const crypto = require('node:crypto');

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

function md5(input) {
  return crypto.createHash('md5').update(input).digest('hex');
}
app.get('/', (req, res) => {
  return res.send("Hello World");
});
app.post('/api/login', async (req, res) => {
  try {
    let { userid, password } = req.body;
    // console.log(userid);
    // console.log(password);
    let { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('userid', userid)
      .maybeSingle();

    if (error || !userData) {
      return res.status(401).json({ error: 'User not found' });
    }
    // console.log(userData);
    
    if (md5(password) == userData.password_hash) {
      // console.log("Passwords match");
      // return res.status(200).json({error : 'Now will login you'});
    }else {
      return res.status(400).json({error : 'Wrong Password'});
    }

    if (userData.role == 'admin') {
      const { data: allUsers, error: fetchError } = await supabase
        .from('users')
        .select('*');
        // console.log(fetchError);
      if (fetchError) {
        return res.status(500).json({ error: 'Failed to fetch admin data' });
      }
      // console.log(allUsers);

      return res.json({ role: 'admin', data: allUsers });
    }

    res.json({
      role: userData.role,
      data: userData
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error occured' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
