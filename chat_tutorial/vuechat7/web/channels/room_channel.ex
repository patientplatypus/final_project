defmodule Vuechat.RoomChannel do
  use Vuechat.Web, :channel
def join("room:lobby", payload, socket) do
    {:ok, socket}
  end
def join("room:lobby2", payload, socket) do
      {:ok, socket}
  end
def join("room:lobby3", payload, socket) do
      {:ok, socket}
  end
def join("room:lobby4", payload, socket) do
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

def handle_in("timer_start", %{"body" => body}, socket) do
    broadcast! socket, "timer_start", %{body: body}
    {:noreply, socket}
  end
def handle_out("timer_start", payload, socket) do
    push socket, "timer_start", payload
    {:noreply, socket}
  end

def handle_in("hotdog_counter", %{"body" => body}, socket) do
    broadcast! socket, "hotdog_counter", %{body: body}
    {:noreply, socket}
  end
def handle_out("hotdog_counter", payload, socket) do
    push socket, "hotdog_counter", payload
    {:noreply, socket}
  end



end
