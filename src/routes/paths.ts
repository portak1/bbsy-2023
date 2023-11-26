const Paths = {
  Base: "/api",
  Auth: {
    Base: "/auth",
    Login: "/login",
    Register: "/register",
  },
  ShoppingList: {
    Base: "/list",
    Get: "/:id",
    Delete: "/:id",
    Patch : "/:id",
    Members: {
      Base: "/:id/users",
      Get: "",
      Delete: "",
      Create: "",
      Patch: "",
    },
    Items: {
      Base: "/:id/item",
      Patch: "/:itemId",
      Delete: "/:itemId",
      Create: "",
      Get: "",
    },
  },
};

export default Paths;
