const Paths = {
  Base: "/api",
  Auth: {
    Base: "/auth",
    Login: "/login",
    Register: "/register",
  },
  ShoppingList: {
    Base: "/list",
    Lists: "/lists",
    Get: "/:id",
    Delete: "/:id",
    Members: {
      Base: "/:id/users",
      Get: "/:id/users/:userId",
      Delete: "/:id/users/:userId",
    },
    Items: {
      Base: "/:id/item",
      Patch: "/:id/item/:itemId",
      Delete: "/:id/item/:itemId",
    },
  },
};

export default Paths;
