<template>
    <v-card
        elevation="12"
        width="256"
    >
        <v-navigation-drawer
            floating
            permanent
        >
            <v-list
            dense
            rounded
            >
            <v-list-item
                v-for="item in items"
                :key="item.title"
                :to="item.path"
                link
            >
                <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>
    
</template>

<script>
  export default {
    data: () => ({
      items: [
          { title: 'Home', icon: 'mdi-home', path: '/' },
          { title: 'Cars', icon: 'mdi-car', path: '/cars'  },
          { title: 'Explore', icon: 'mdi-compass', path: '/explore'  },
          { title: 'Share', icon: 'mdi-account-group', path: '/share'  },
        ],
    }),
  }
</script>