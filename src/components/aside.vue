<template>
    <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleSize">| | |</div>
          <el-menu
            unique-opened
            router
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#DDA0DD"
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-active="activePath"
          >
            <!-- 一级菜单 -->
            <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <i :class="iconObj[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index="'/'+subitem.path"
                :key="subitem.id"
                v-for="subitem in item.children"
                @click="saveNavState('/'+subitem.path)"
              >
                <template>
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{subitem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
</template>