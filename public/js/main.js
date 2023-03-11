function onSubmit(e) {
  e.preventDefault();
  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";
  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;
  if (size !== "trigger") {
    console.log(prompt, size);

    generateImageRequest(prompt, size);
  } else {
    alert("Select an image size");
  }
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();
    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      hideSpinner();
      throw new Error("That image could not be generated");
    }

    const data = await response.json();
    console.log(data);
    const imageUrl = data.imageUrl;
    document.querySelector("#image").src = imageUrl;
    hideSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
