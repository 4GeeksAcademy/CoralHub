import Swal from "sweetalert2";

const coralHubStyle = {
    background: "#1b2430",
    color: "#ffffff",
    confirmButtonColor: "#4ec7c1"
};

export const successAlert = (title, text) => {
    return Swal.fire({
        icon: "success",
        title,
        text,
        ...coralHubStyle
    });
};

export const errorAlert = (title, text) => {
    return Swal.fire({
        icon: "error",
        title,
        text,
        ...coralHubStyle
    });
};

export const warningAlert = (title, text) => {
    return Swal.fire({
        icon: "warning",
        title,
        text,
        ...coralHubStyle
    });
};

export const confirmAlert = (title, text) => {
    return Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        ...coralHubStyle,
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel"
    });
};