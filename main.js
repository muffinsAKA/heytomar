const text = document.getElementById('tomar-text');

async function getHypothetical() {
  try {
    const apiKey = process.env.API_KEY;
    const response = await fetch('https://xvl6g9g9xk.execute-api.us-east-1.amazonaws.com/dev', {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    
    return data.content;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}