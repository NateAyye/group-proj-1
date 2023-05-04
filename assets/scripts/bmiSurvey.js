const modalBackground = $('[role="dialog"]')[0];
const submitBmiBtn = $('#submit-bmi-btn');
const cancelBmiBtn = $('#cancel-bmi');

function handleModal(e) {
  const modalStateHidden =
    modalBackground.getAttribute('aria-hidden') === 'true';

  if (!modalStateHidden) {
    modalBackground.setAttribute('aria-hidden', 'true');
  } else {
    modalBackground.setAttribute('aria-hidden', 'false');
  }
}

const options = {
  method: 'GET',
  url: 'https://fitness-calculator.p.rapidapi.com/dailycalorie',
  params: {
    age: '25',
    gender: 'male',
    height: '180',
    weight: '70',
    activitylevel: 'level_1',
  },
  headers: {
    'X-RapidAPI-Key': 'b681d02421mshdf8c1da87759638p16c1fajsn5f6f4a0059e9',
    'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
  },
};

$(() => {
  const bmi = localStorage.getItem('bmi');
  if (!bmi) {
    modalBackground.setAttribute('aria-hidden', 'false');
  }

  cancelBmiBtn.click(() => {
    console.log(modalBackground);
    modalBackground.setAttribute('aria-hidden', 'true');
  });

  submitBmiBtn.click(() => {
    const age = $('#age').val();
    const weight = $('#weight').val();
    const height = $('#height').val();

    fetch(
      `https://fitness-calculator.p.rapidapi.com/bmi?age=${age}&weight=${weight}&height=${height}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            'b681d02421mshdf8c1da87759638p16c1fajsn5f6f4a0059e9',
          'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
        },
      },
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          localStorage.setItem('bmi', JSON.stringify(data.data));
          modalBackground.setAttribute('aria-hidden', 'true');
        }
      });
  });
});
