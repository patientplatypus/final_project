defmodule Vuechat.RoomChannel do
  use Vuechat.Web, :channel
def join("room:lobby", payload, socket) do
    {:ok, socket}
  end
def join("room:lobby2", payload, socket) do
      {:ok, socket}
  end
def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "Unauthorized"}}
  end

def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast! socket, "new_msg", %{body: body}
    {:noreply, socket}
  end
def handle_out("new_msg", payload, socket) do
    push socket, "new_msg", payload
    {:noreply, socket}
  end

def handle_in("new_img", %{"body" => body}, socket) do
    broadcast! socket, "new_img", %{body: body}
    {:noreply, socket}
  end
def handle_out("new_img", payload, socket) do
    push socket, "new_img", payload
    {:noreply, socket}
  end

end
