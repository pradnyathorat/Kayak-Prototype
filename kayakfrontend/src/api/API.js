const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

export const doAdminLogin = (payload) =>
fetch(`${api}/loginAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    console.log(res);
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});


export const doSignup = (payload) =>
fetch(`${api}/signup`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const updateUserInfo = (payload) =>
fetch(`${api}/updateUserInfo`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const updateUserBilling = (payload) =>
fetch(`${api}/updateCardDetails`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const deleteAccount = (payload) =>
fetch(`${api}/deleteAccount`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doSignOut = (payload) =>
fetch(`${api}/logout`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const addHotelAdmin = (payload) =>
fetch(`${api}/addHotelAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});


export const updateHotelAdmin = (payload) =>
    fetch(`${api}/updateHotelAdmin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const addFlightAdmin = (payload) =>
    fetch(`${api}/addFlightAdmin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const updateFlightAdmin = (payload) =>
    fetch(`${api}/updateFlightAdmin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const addCarAdmin = (payload) =>
    fetch(`${api}/addCarAdmin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const updateCarAdmin = (payload) =>
    fetch(`${api}/updateCarAdmin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const updateUserAdmin = (payload) =>
fetch(`${api}/updateUserDataAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
    });


export const adminGetAllHotels = () =>
fetch(`${api}/getAllHotel`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});



export const adminGetAllFlights = () =>
fetch(`${api}/getAllFlight`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const adminGetAllCars = () =>
fetch(`${api}/getAllCar`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const deleteHotelAdmin = (payload) =>
fetch(`${api}/deleteHotelAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const deleteFlightAdmin = (payload) =>
fetch(`${api}/deleteFlightAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const deleteCarAdmin = (payload) =>
fetch(`${api}/deleteCarAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const deleteUserAdmin = (payload) =>
fetch(`${api}/deleteUserDataAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const searchHotelAdmin = (payload) =>
fetch(`${api}/searchHotelAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const searchFlightAdmin = (payload) =>
fetch(`${api}/searchFlightAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const searchCarAdmin = (payload) =>
fetch(`${api}/searchCarAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const searchUserAdmin = (payload) =>
fetch(`${api}/searchUserDataAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const adminGetAllUsers = () =>
fetch(`${api}/getAllUserDataAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const adminGetAllBilling = () =>
fetch(`${api}/getAllBillAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const searchBillsDateAdmin = (payload) =>
fetch(`${api}/searchBillDateAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const searchBillsMonthAdmin = (payload) =>
fetch(`${api}/searchBillMonthAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const searchCityNames = (payload) =>
fetch(`${api}/searchCityAuto`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const checkAdminSession = () =>
fetch(`${api}/adminSessioncheck`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doAdminSignOut = (payload) =>
fetch(`${api}/adminLogout`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doAdminAnalysisRevenueHotel = (payload) =>
fetch(`${api}/getRevenue/tophotels`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doAdminAnalysisRevenueFlight = (payload) =>
fetch(`${api}/getRevenue/topflights`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doAdminAnalysisRevenueCar = (payload) =>
fetch(`${api}/getRevenue/cars`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doAdminAnalysisRevenueCity = (payload) =>
fetch(`${api}/getRevenue/citywise`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const createReview = (payload) =>
fetch(`${api}/createReview`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
    });


export const checkSession = () =>
fetch(`${api}/sessioncheck`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doHotelSearch = (payload) =>
fetch(`${api}/hotels`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doFlightSearch = (payload) =>
fetch(`${api}/flights`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doCarSearch = (payload) =>
fetch(`${api}/cars`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const getUserDetails = (payload) =>
fetch(`${api}/getUserDetails`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const getBillingDetails = (payload) =>
fetch(`${api}/getCardDetails`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doHotelBooking = (payload) =>
fetch(`${api}/hotels/book`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doCarBooking = (payload) =>
fetch(`${api}/cars/book`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doFlightBooking = (payload) =>
fetch(`${api}/flights/book`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const getAllBookings = (payload) =>
fetch(`${api}/getBookings`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const getCount = () =>
fetch(`${api}/getcount/users`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const saveRecord = (payload) =>
fetch(`${api}/getcount/saveRecord`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

