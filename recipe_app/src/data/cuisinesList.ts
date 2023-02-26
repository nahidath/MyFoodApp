const cuisinesList = [
    {
        id: 0,
        name: 'African',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fafrican.jpg?alt=media&token=09952fa4-1b4a-4b65-8f88-3c7327e0480e'
    },
    {
        id: 1,
        name: 'American',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Famerican.jpg?alt=media&token=6175e103-9f40-4ce7-9fe7-f36f79b6b727'
    },
    {
        id: 2,
        name: 'Asian',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fasian.jpg?alt=media&token=135746c8-356b-4f02-95ef-de3ff9cb2866'
    },
    {
        id: 3,
        name: 'British',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fbritish.jpg?alt=media&token=2af0079c-91d9-4113-bd19-3355d643d818'
    },
    {
        id: 4,
        name: 'Cajun',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fcajun.jpg?alt=media&token=c8234650-2f92-4b44-a95c-7317ac8c1a04'
    },
    {
        id: 5,
        name: 'Caribbean',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fcaribbean.jpg?alt=media&token=18f918df-c50c-4179-b366-fed70f81591a'
    },
    {
        id: 6,
        name: 'Chinese',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fchinese.jpg?alt=media&token=7b8720b4-1fa9-4ef5-b093-04690b499045'
    },
    {
        id: 7,
        name: 'Eastern European',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Feastern-european.jpg?alt=media&token=d0fee0df-73ce-44f1-829a-fd2fc086b3ba'
    },
    {
        id: 8,
        name: 'European',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Feuropean.jpg?alt=media&token=7d6c6949-00e0-4bf7-838c-1c7f4a32730b'
    },
    {
        id: 9,
        name: 'French',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Ffrench.jpg?alt=media&token=e77e54b2-537e-45c7-9474-93887e8ba7e1'
    },
    {
        id: 10,
        name: 'German',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fgerman.jpg?alt=media&token=1d70131b-9437-447d-91d0-4b6743fe27f4'
    },
    {
        id: 11,
        name: 'Greek',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fgreek.jpg?alt=media&token=89d34998-7d2e-4868-9c05-645e624695e9'
    },
    {
        id: 12,
        name: 'Indian',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Findian.jpg?alt=media&token=9cd8ec47-811f-4c30-a038-9cff21b241a2'
    },
    {
        id: 13,
        name: 'Irish',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Firish.jpg?alt=media&token=1f46b637-d60a-4a79-bf43-e954418e5b78'
    },
    {
        id: 14,
        name: 'Italian',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fitalian.jpg?alt=media&token=9e1816f8-45e6-423e-8449-9c68a5adb4e7'
    },
    {
        id: 15,
        name: 'Japanese',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fjapanese.jpg?alt=media&token=1302a901-f849-4e25-a0c6-bfd2e8f17558'
    },
    {
        id: 16,
        name: 'Jewish',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fjewish.jpg?alt=media&token=a86698db-fdb8-4d25-97ee-b76225170594'
    },
    {
        id: 17,
        name: 'Korean',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fkorean.jpg?alt=media&token=da10310b-58b9-4692-a4f3-5456fb97e5bf'
    },
    {
        id: 18,
        name: 'Latin American',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Flatin-american.jpg?alt=media&token=e59e1fb4-6d29-4f6b-bdef-40f3b75ab18b'
    },
    {
        id: 19,
        name: 'Mediterranean',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fmediterranean.jpg?alt=media&token=7e4e4579-9215-40c0-8976-7c647503cdc1'
    },
    {
        id: 20,
        name: 'Mexican',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fmexican.jpg?alt=media&token=285663e3-29a1-4887-9ed7-74bdcb580e64'
    },
    {
        id: 21,
        name: 'Middle Eastern',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fmiddle-eastern.jpg?alt=media&token=0f1ec0b0-3f6f-49ab-ad8c-8677b0d9874c'
    },
    {
        id: 22,
        name: 'Nordic',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fnordic.jpg?alt=media&token=daf4a09d-54d8-4eef-80c1-39d4883e081a'
    },
    {
        id: 23,
        name: 'Southern',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fsouthern.jpg?alt=media&token=04c39d42-7fe8-4f09-853f-82b136db5773'
    },
    {
        id: 24,
        name: 'Spanish',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fspanish.jpg?alt=media&token=e1991d57-5c93-4a1e-ae2b-33814a3a9b49'
    },
    {
        id: 25,
        name: 'Thai',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fthai.jpg?alt=media&token=9b1b43c1-ae08-4a98-a319-e320761c3efb'
    },
    {
        id: 26,
        name: 'Vietnamese',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-recipe-app-72535.appspot.com/o/countryPics%2Fvietnamese.jpg?alt=media&token=eed76745-4422-4712-8539-a24a03da7ea3'
    }
];

export default cuisinesList;