import logic from './Logic.js';

describe('Water tests', () => {
  test('Water falls into void', () => {
    expect(
      logic(
        [
          [{ element: 'Water' }, { element: 'Void' }],
          [{ element: 'Void' }, { element: 'Void' }]
        ],
        2
      )
    ).toEqual([
      [{ element: 'Void' }, { element: 'Void' }],
      [{ element: 'Water' }, { element: 'Void' }]
    ]);
  });

  test('Sand falls in water', () => {
    expect(
      logic(
        [
          [{ element: 'Sand' }, { element: 'Void' }],
          [{ element: 'Water' }, { element: 'Void' }]
        ],
        2
      )
    ).toEqual([
      [{ element: 'Water' }, { element: 'Void' }],
      [{ element: 'Sand' }, { element: 'Void' }]
    ]);
  });
  test('Water piles', () => {
    expect(
      logic(
        logic(
          [
            [{ element: 'Water' }, { element: 'Void' }, { element: 'Void' }],
            [{ element: 'Water' }, { element: 'Void' }, { element: 'Void' }],
            [{ element: 'Water' }, { element: 'Void' }, { element: 'Void' }]
          ],
          3
        ),
        3
      )
    ).toEqual([
      [{ element: 'Void' }, { element: 'Void' }, { element: 'Void' }],
      [{ element: 'Void' }, { element: 'Void' }, { element: 'Void' }],
      [{ element: 'Water' }, { element: 'Water' }, { element: 'Water' }]
    ]);
  });
  test('Water falls', () => {
    expect(
      logic(
        [
          [{ element: 'Water' }, { element: 'Void' }, { element: 'Void' }],
          [{ element: 'Water' }, { element: 'Water' }, { element: 'Void' }],
          [{ element: 'Water' }, { element: 'Water' }, { element: 'Water' }]
        ],
        3
      )
    ).toEqual([
      [{ element: 'Void' }, { element: 'Void' }, { element: 'Void' }],
      [{ element: 'Water' }, { element: 'Water' }, { element: 'Water' }],
      [{ element: 'Water' }, { element: 'Water' }, { element: 'Water' }]
    ]);
  });
});

describe('Sand tests', () => {
  test('Sand falls into void', () => {
    expect(
      logic(
        [
          [{ element: 'Sand' }, { element: 'Void' }],
          [{ element: 'Void' }, { element: 'Void' }]
        ],
        2
      )
    ).toEqual([
      [{ element: 'Void' }, { element: 'Void' }],
      [{ element: 'Sand' }, { element: 'Void' }]
    ]);
  });

  test('Sand falls in water', () => {
    expect(
      logic(
        [
          [{ element: 'Sand' }, { element: 'Void' }],
          [{ element: 'Water' }, { element: 'Void' }]
        ],
        2
      )
    ).toEqual([
      [{ element: 'Water' }, { element: 'Void' }],
      [{ element: 'Sand' }, { element: 'Void' }]
    ]);
  });
  test('Sand falls', () => {
    expect(
      logic(
        logic(
          [
            [{ element: 'Sand' }, { element: 'Void' }, { element: 'Void' }],
            [{ element: 'Sand' }, { element: 'Void' }, { element: 'Void' }],
            [{ element: 'Sand' }, { element: 'Void' }, { element: 'Void' }]
          ],
          3
        ),
        3
      )
    ).toEqual([
      [{ element: 'Void' }, { element: 'Void' }, { element: 'Void' }],
      [{ element: 'Void' }, { element: 'Void' }, { element: 'Void' }],
      [{ element: 'Sand' }, { element: 'Sand' }, { element: 'Sand' }]
    ]);
  });

  test('Sand piles', () => {
    expect(
      logic(
        [
          [{ element: 'Sand' }, { element: 'Void' }, { element: 'Void' }],
          [{ element: 'Sand' }, { element: 'Sand' }, { element: 'Void' }],
          [{ element: 'Sand' }, { element: 'Sand' }, { element: 'Sand' }]
        ],
        3
      )
    ).toEqual([
      [{ element: 'Sand' }, { element: 'Void' }, { element: 'Void' }],
      [{ element: 'Sand' }, { element: 'Sand' }, { element: 'Void' }],
      [{ element: 'Sand' }, { element: 'Sand' }, { element: 'Sand' }]
    ]);
  });
});

describe('Oil tests', () => {
  test('Oil rises in water', () => {
    expect(
      logic(
        [
          [{ element: 'Water' }, { element: 'Void' }],
          [{ element: 'Oil' }, { element: 'Void' }]
        ],
        2
      )
    ).toEqual([
      [{ element: 'Oil' }, { element: 'Void' }],
      [{ element: 'Water' }, { element: 'Void' }]
    ]);
  });

  test('Water piles in oil', () => {
    expect(
      logic(
        [
          [{ element: 'Oil' }, { element: 'Oil' }, { element: 'Oil' }],
          [{ element: 'Oil' }, { element: 'Water' }, { element: 'Oil' }],
          [{ element: 'Water' }, { element: 'Water' }, { element: 'Oil' }]
        ],
        3
      )
    ).toEqual([
      [{ element: 'Oil' }, { element: 'Oil' }, { element: 'Oil' }],
      [{ element: 'Oil' }, { element: 'Oil' }, { element: 'Oil' }],
      [{ element: 'Water' }, { element: 'Water' }, { element: 'Water' }]
    ]);
  });
  test('Oil piles upside-down in water', () => {
    expect(
      logic(
        [
          [{ element: 'Water' }, { element: 'Oil' }, { element: 'Water' }],
          [{ element: 'Water' }, { element: 'Oil' }, { element: 'Water' }],
          [{ element: 'Water' }, { element: 'Water' }, { element: 'Water' }]
        ],
        3
      )
    ).toEqual([
      [{ element: 'Oil' }, { element: 'Oil' }, { element: 'Oil' }],
      [{ element: 'Water' }, { element: 'Water' }, { element: 'Water' }],
      [{ element: 'Water' }, { element: 'Water' }, { element: 'Water' }]
    ]);
  });
});

describe('Plant tests', () => {
  test('Plant falls', () => {
    expect(
      logic(
        [
          [{ element: 'Plant' }, { element: 'Void' }],
          [{ element: 'Void' }, { element: 'Void' }]
        ],
        2
      )
    ).toEqual([
      [{ element: 'Void' }, { element: 'Void' }],
      [{ element: 'Plant' }, { element: 'Void' }]
    ]);
  });
  test('Plant blooms', () => {
    expect(
      logic(
        [
          [{ element: 'Void' }, { element: 'Void' }],
          [{ element: 'Plant' }, { element: 'Void' }]
        ],
        2
      )
    ).toEqual([
      [{ element: 'Flower' }, { element: 'Void' }],
      [{ element: 'Plant' }, { element: 'Void' }]
    ]);
  });
  test('Plant grows and drinks water', () => {
    expect(
      logic(
        [
          [
            { element: 'Void' },
            { element: 'Void' },
            { element: 'Void' },
            { element: 'Void' }
          ],
          [
            { element: 'Void' },
            { element: 'Void' },
            { element: 'Void' },
            { element: 'Void' }
          ],
          [
            { element: 'Flower' },
            { element: 'Void' },
            { element: 'Void' },
            { element: 'Void' }
          ],
          [
            { element: 'Plant' },
            { element: 'Water' },
            { element: 'Void' },
            { element: 'Void' }
          ]
        ],
        4
      )
    ).toEqual([
      [
        { element: 'Void' },
        { element: 'Void' },
        { element: 'Void' },
        { element: 'Void' }
      ],
      [
        { element: 'Flower' },
        { element: 'Void' },
        { element: 'Void' },
        { element: 'Void' }
      ],
      [
        { element: 'Plant' },
        { element: 'Void' },
        { element: 'Void' },
        { element: 'Void' }
      ],
      [
        { element: 'Plant' },
        { element: 'Void' },
        { element: 'Void' },
        { element: 'Void' }
      ]
    ]);
  });
  test('Plant doesnt grow too high', () => {
    expect(
      logic(
        [
          [{ element: 'Flower' }, { element: 'Void' }],
          [{ element: 'Plant' }, { element: 'Water' }]
        ],
        2
      )
    ).toEqual([
      [{ element: 'Flower' }, { element: 'Void' }],
      [{ element: 'Plant' }, { element: 'Void' }]
    ]);
  });
});

describe('Fire tests', () => {
  test('Fire burns neighbors', () => {
    expect(
      logic(
        [
          [{ element: 'Rock' }, { element: 'Wood' }, { element: 'Rock' }],
          [{ element: 'Flower' }, { element: 'Fire' }, { element: 'Plant' }],
          [{ element: 'Rock' }, { element: 'Oil' }, { element: 'Rock' }]
        ],
        3
      )
    ).toEqual([
      [{ element: 'Rock' }, { element: 'Fire' }, { element: 'Rock' }],
      [{ element: 'Fire' }, { element: 'Fire' }, { element: 'Fire' }],
      [{ element: 'Rock' }, { element: 'Fire' }, { element: 'Rock' }]
    ]);
  });
});
