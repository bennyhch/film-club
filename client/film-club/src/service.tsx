const url = "http://localhost:3000";

const data = {
  loginUser: async (email: string, password: string) => {
    const response = await fetch(`${url}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((response) => response.json());
    return response;
  },

  registerUser: async (email: string, password: string) => {
    const response = await fetch(`${url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((response) => response.json());
    return response;
  },

  getOnLoadHome: async (sessionid: number) => {
    const response = await fetch(`${url}/home`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: sessionid }),
    }).then((response) => response.json());
    return response;
  },

  addWatchlistFromHome: async (movie: Movie) => {
    const response = await fetch(`${url}/home/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    }).then((response) => response.json());
    return response;
  },

  addWatchedFromHome: async (movie: Movie) => {
    const response = await fetch(`${url}/home/watched`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    }).then((response) => response.json());
    return response;
  },

  deleteMovieFromHome: async (movie: Movie) => {
    const response = await fetch(`${url}/home`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    }).then((response) => response.json());
    return response;
  },

  logoutFromHome: async () => {
    const response = await fetch(`${url}/home`, {
      method: "POST",
    });
    return response;
  },

  getOnLoadWatchlist: async (sessionid: number) => {
    const response = await fetch(`${url}/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: sessionid }),
    }).then((response) => response.json());
    return response;
  },

  addWatchedFromWatchlist: async (movie: Movie) => {
    const response = await fetch(`${url}/watchlist/watched`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    }).then((response) => response.json());
    return response;
  },

  deleteMovieFromWatchlist: async (movie: Movie) => {
    const response = await fetch(`${url}/watchlist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    }).then((response) => response.json());
    return response;
  },

  logoutFromWatchlist: async () => {
    const response = await fetch(`${url}/watchlist`, {
      method: "POST",
    });
    return response;
  },

  getOnLoadWatched: async (sessionid: number) => {
    const response = await fetch(`${url}/watched`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: sessionid }),
    }).then((response) => response.json());
    return response;
  },

  deleteMovieFromWatched: async (movie: Movie) => {
    const response = await fetch(`${url}/watched`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    }).then((response) => response.json());
    return response;
  },

  logoutFromWatched: async () => {
    const response = await fetch(`${url}/watched`, {
      method: "POST",
    });
    return response;
  },

  getOnLoadCollections: async (sessionid: number) => {
    const response = await fetch(`${url}/collections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: sessionid }),
    }).then((response) => response.json());
    return response;
  },

  addActorCollections: async (name: string) => {
    const response = await fetch(`${url}/collections/addactor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    }).then((response) => response.json());
    return response;
  },

  addDirectorCollections: async (name: string) => {
    const response = await fetch(`${url}/collections/adddirector`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    }).then((response) => response.json());
    return response;
  },

  addWatchlistFromCollections: async (movie: Movie) => {
    const response = await fetch(`${url}/collections/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    }).then((response) => response.json());
    return response;
  },

  addWatchedFromCollections: async (movie: Movie) => {
    const response = await fetch(`${url}/collections/watched`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    }).then((response) => response.json());
    return response;
  },

  deleteActorFromCollection: async (name: string) => {
    const response = await fetch(`${url}/collections/collection`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    }).then((response) => response.json());
    return response;
  },

  deleteMovieFromCollections: async (movie: Movie) => {
    const response = await fetch(`${url}/collections`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    }).then((response) => response.json());
    return response;
  },

  logoutFromCollections: async () => {
    const response = await fetch(`${url}/collections`, {
      method: "POST",
    });
    return response;
  },
};

export default data;
