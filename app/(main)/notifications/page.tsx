"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  useDeleteNotification,
  useGetNotifications,
  useUpdateNotification,
} from "@/utils/hooks/useNotifications";
import { useAuth } from "@/utils/AuthContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { customToast } from "@/components/helpers/functions";
const Notifications = () => {
  const { user } = useAuth();
  const { data: notifications } = useGetNotifications(user._id);
  const { mutateAsync: markAsRead } = useUpdateNotification();
  const { mutateAsync: deleteNotification } = useDeleteNotification();
  const handleDelete = async (id: string) => {
    const update = async () => {
      user.admin
        ? await deleteNotification(id)
        : await markAsRead({
            _id: id,
            userId: user._id,
          });
    };
    customToast({
      userFunction: update,
      successMessage: "Notification deleted successfully",
    });
  };
  return (
    <Box m={1}>
      <Typography variant="h4">Notifications</Typography>
      <Grid container spacing={1} my={1}>
        {notifications?.map((notification) => (
          <Grid item key={notification._id} xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {notification.title}
                </Typography>
                <Typography variant="h5" component="div">
                  {notification.body}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleDelete(notification._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Notifications;
