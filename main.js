const text = document.getElementById('tomar-text');

async function getHypothetical() {
  try {
    const response = await fetch('https://xvl6g9g9xk.execute-api.us-east-1.amazonaws.com/dev/hypothetical', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    const data = await response.text();
    
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}

const hypothetical = getHypothetical();
text.innerHTML = hypothetical;